import fs from 'node:fs';
import vm from 'node:vm';

const html = fs.readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
const match = html.match(/const skills=(\[[\s\S]*?\n\]);\nconst categories=/);

if (!match) throw new Error('Could not find the catalog data.');

const skills = vm.runInNewContext(match[1], Object.create(null), { timeout: 1000 });
const requiredIds = ['search', 'filters', 'count', 'grid', 'detail', 'detailTitle', 'detailGithub'];
const urls = new Set();
const repos = new Set();
const categories = new Set();

if (!Array.isArray(skills) || skills.length < 100) {
  throw new Error(`Expected a substantial catalog; found ${skills?.length ?? 0} entries.`);
}

for (const [index, entry] of skills.entries()) {
  if (!Array.isArray(entry) || entry.length !== 5 || entry.some(value => typeof value !== 'string' || !value.trim())) {
    throw new Error(`Entry ${index + 1} must have five non-empty string fields.`);
  }

  const [name, category, description, repository, url] = entry;
  const parsed = new URL(url);
  if (parsed.protocol !== 'https:' || parsed.hostname !== 'github.com') {
    throw new Error(`${name} must use an https://github.com source URL.`);
  }
  if (urls.has(url)) throw new Error(`Duplicate URL: ${url}`);
  if (!repository.includes('/')) throw new Error(`${name} has an invalid repository identifier.`);
  if (description.length > 180) throw new Error(`${name} has an overly long description.`);

  urls.add(url);
  repos.add(repository.toLowerCase());
  categories.add(category);
}

for (const id of requiredIds) {
  if (!html.includes(`id="${id}"`)) throw new Error(`Missing required interface element #${id}.`);
}

const script = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
if (!script) throw new Error('Missing application script.');
new vm.Script(script);

console.log(`Validated ${skills.length} resources, ${urls.size} unique URLs, ${repos.size} repositories, and ${categories.size} categories.`);


# Skill Atlas

A focused, searchable catalog of AI-agent resources from across GitHub.

**Live site:** <https://aibek09.github.io/skill-atlas/>

Skill Atlas currently organizes **172 resources from 82 repositories** across engineering, product, design, research, security, operations, and other categories. Entries include individual skills, collections, tools, and guides. Each entry provides a concise catalog summary and a direct link to its original GitHub source.

> Skill Atlas is an independent directory. It is not affiliated with GitHub or the linked projects, and inclusion is not an endorsement or security review.

## Features

- Fast text search across names, descriptions, categories, and repositories
- Category filtering with live result counts
- Clear distinction between catalog summaries and original sources
- Responsive, keyboard-friendly blue-and-white interface
- No framework, package installation, tracking, or backend required

## Run locally

From the repository root:

```bash
python3 -m http.server 4173 --directory dist
```

Then open <http://localhost:4173>.

## Validate the catalog

```bash
npm test
```

The validator checks the embedded JavaScript, required interface elements, unique GitHub URLs, required entry fields, and catalog statistics.

## Project structure

```text
dist/                         Published static site
scripts/validate-catalog.mjs  Dependency-free catalog validation
.github/workflows/            CI and GitHub Pages deployment
```

## Contributing

Suggestions and corrections are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

## Licensing and third-party resources

The Skill Atlas website code and original catalog summaries are available under the [MIT License](LICENSE). Linked repositories, skills, trademarks, and documentation remain the property of their respective owners and are governed by their own licenses. Skill Atlas does not redistribute the contents of linked skills.

See [NOTICE.md](NOTICE.md) for the third-party rights and attribution boundary.

Review a resource's source, license, permissions, dependencies, and scripts before installing or running it.

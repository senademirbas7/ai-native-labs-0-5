const fs = require('fs');
const fetch = require('node-fetch');
const marked = require('marked');

const base = 'https://epam-team-y3bxkrl5.atlassian.net/wiki';
const apiBase = base + '/rest/api';
const email = 'sehrisena_demirbas@epam.com';
const token = process.env.ATLASSIAN_TOKEN || "";
const auth = Buffer.from(`${email}:${token}`).toString('base64');

const mdPath = 'specs/prds/PRD-001.md';
const spaceKey = 'PM';

(async () => {
  try {
    const md = fs.readFileSync(mdPath, 'utf8');
    // Extract title from frontmatter if present
    let title = 'New Page';
    const fm = md.match(/---\n([\s\S]*?)\n---/);
    if (fm) {
      const m = fm[1].match(/title:\s*"([^"]+)"/);
      if (m) title = m[1];
    }

    const html = marked.parse(md);

    const body = {
      type: 'page',
      title: title,
      space: { key: spaceKey },
      body: {
        storage: {
          value: html,
          representation: 'storage'
        }
      }
    };

    const res = await fetch(`${apiBase}/content`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    fs.writeFileSync('confluence_create_response.json', JSON.stringify(data, null, 2), 'utf8');
    console.log('WROTE=confluence_create_response.json');
  } catch (err) {
    fs.writeFileSync('confluence_create_error.json', String(err), 'utf8');
    console.error('ERROR', err);
  }
})();

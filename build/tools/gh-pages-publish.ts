import { cd, exec, echo, touch } from 'shelljs'
import { readFileSync } from 'fs'
import * as url from 'url'

let repoUrl
let pkg = JSON.parse(readFileSync('package.json') as any)
if (typeof pkg.repository === 'object') {
  if (!pkg.repository.hasOwnProperty('url')) {
    throw new Error('URL does not exist in repository section')
  }
  repoUrl = pkg.repository.url
} else {
  repoUrl = pkg.repository
}

let parsedUrl = url.parse(repoUrl)
let repository = (parsedUrl.host || '') + (parsedUrl.path || '')
let githubToken = process.env.GITHUB_PAGES_TOKEN
console.log(githubToken)
echo('Deploying docs...')
exec('yarn docs')
cd('docs')
touch('.nojekyll')
exec('git init')
exec('git add .')
exec('git config user.name "--username--"')
exec('git config user.email "--usermail--"')
exec('git commit -m "docs(docs): update gh-pages"')
exec(
  `git push --force --quiet "https://${githubToken}@${repository}" master:gh-pages`
)
echo('Docs deployed!')

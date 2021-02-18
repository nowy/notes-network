import * as path from "path";
import fs from 'fs';
import { Converter, Metadata } from 'showdown';

const input = {
  dir: path.join(__dirname, '..', '_notes'),
}

const output = {
  dir: path.join(__dirname, '..', 'dist'),
  file: 'notes.json',
}

const removeSquareBrackets = (s: string) => s.replace(/[\[\]']+/g, '')
const getId = (f: string) => {
  const parsedId = parseInt(f.split(' ')[0])
  return isNaN(parsedId) ? null : parsedId
};

(async () => {
  await fs.promises.mkdir(output.dir, { recursive: true })

  const mdConverter = new Converter({ metadata: true })
  const files = await fs.promises.readdir(input.dir)

  const nodes = await Promise.all(files.map(async fileName => {
    const fileContent = await fs.promises.readFile(
      path.join(input.dir, fileName),
      { encoding: 'utf-8' }
    )

    return {
      id: getId(fileName),
      html: mdConverter.makeHtml(fileContent),
      metaData: Object.fromEntries(
        Object.entries(mdConverter.getMetadata(false) as Metadata).map(([key, entry]) => [
          key,
          removeSquareBrackets(entry).split(',').map(s => s.trim())
        ])
      ),
      linksTo: (() => {
        const matches = fileContent.match(/\[\[(.*?)\]\]/g)
        return matches ? matches.map(removeSquareBrackets).map(getId) : []
      })(),
      label: (() => {
        if (getId(fileName) === null) return fileName.split('.')[0]
        const [_, ...rest] = fileName.split(' ')
        return rest.join(' ').split('.')[0]
      })()
    }
  }))

  await fs.promises.writeFile(
    path.join(output.dir, output.file),
    JSON.stringify({
      nodes,
      edges: nodes.flatMap(({ id, linksTo }) => (
        linksTo.flatMap(link => link ? [{ source: id, target: link }] : [])
      ))
    })
  )

  console.log(`✅ Post written to file "${output.file}"`)
})()

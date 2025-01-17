import { runRule } from '../../lib/init-test.js'
import { annotateFrontmatter } from '../../lib/linting-rules/annotate-frontmatter.js'

describe(annotateFrontmatter.names.join(' - '), () => {
  test('No layout property fails', async () => {
    const markdown = ['---', 'title: Title', '---', '```shell annotate', 'hello', '```'].join('\n')
    const result = await runRule(annotateFrontmatter, { strings: { markdown } })
    const errors = result.markdown
    expect(errors.length).toBe(1)
    expect(errors[0].lineNumber).toBe(4)
    expect(errors[0].errorRange).toEqual([1, 17])
    expect(errors[0].fixInfo).toBeNull()
  })
  test('Incorrect layout property fails', async () => {
    const markdown = ['---', 'layout: default', '---', '```shell annotate', 'hello', '```'].join(
      '\n',
    )
    const result = await runRule(annotateFrontmatter, { strings: { markdown } })
    const errors = result.markdown
    expect(errors.length).toBe(1)
  })
  test('Correct layout property passes', async () => {
    const markdown = ['---', 'layout: inline', '---', '```shell annotate', 'hello', '```'].join(
      '\n',
    )
    const result = await runRule(annotateFrontmatter, { strings: { markdown } })
    const errors = result.markdown
    expect(errors.length).toBe(0)
  })
})

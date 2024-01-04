import * as fs from 'fs'
import KoaRouter from 'koa-router'
// 引入 docx 所需 API
import { 
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
} from 'docx'

const exportRouter = new KoaRouter()

// docx 文档设置文字的例子
const textSample1 = new TextRun('hello world')
const textSample2 = new TextRun({
  text: 'foo bar',
  bold: true,
})

// docx 文档设置表格的例子
const tableSample = new Table({
  rows: [
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('hello')],
        }),
      ],
    }),
  ]
})

exportRouter.get('/', async (ctx, next) => {
  console.log('get路由')
  ctx.response.body = 'get路由'

  const doc = new Document({
    // 每个 section 默认占一页
    sections: [
      {
        properties: {},
        children: [
          // 一个 paragraph 就是一段
          new Paragraph({
            children: [
              textSample1,
              textSample2,
            ]
          }),
          new Paragraph({
            children: [
              textSample1,
              textSample2,
            ]
          }),
          // 表格直接放在 section 下的 children 即可，无需 new Paragraph()
          tableSample,
        ]
      },
      {
        properties: {},
        children: [
          // 一个 paragraph 就是一段
          new Paragraph({
            children: [
              textSample1,
              textSample2,
            ]
          }),
          new Paragraph({
            children: [
              textSample1,
              textSample2,
            ]
          }),
        ]
      }
    ]
  })
  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("output_docx/docx导出文档测试.docx", buffer)
  })

  next()
})

export default exportRouter
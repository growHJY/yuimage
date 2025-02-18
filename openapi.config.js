//改为import即可
import { generateService } from '@umijs/openapi'

generateService({
  schemaPath: 'http://localhost:8080/api/v2/api-docs', // 可以是.json文件，也可以是远程json地址
  serversPath: './src',
  requestLibPath: 'import request from "@/plugins/myAxios"',
})

<template>
  <el-form ref="form" :model="form" label-width="80px" :rules="rules">
    <el-form-item hidden="true">
      <el-input v-model="form.pageId"></el-input>
    </el-form-item>
    <el-form-item label="所属站点" prop="siteId">
      <el-select v-model="form.siteId" placeholder="请选择所属站点">
        <el-option
          v-for="site in siteList"
          :key="site.siteId"
          :label="site.siteName"
          :value="site.siteId">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="选择模版" prop="pageTemplate">
      <el-select v-model="form.templateId" placeholder="请选择模版">
        <el-option
          v-for="template in pageTemplateList"
          :key="template.templateId"
          :label="template.templateName"
          :value="template.templateId">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="页面名称" prop="pageName">
      <el-input v-model="form.pageName"></el-input>
    </el-form-item>
    <el-form-item label="别名" prop="pageAliase">
      <el-input v-model="form.pageAliase"></el-input>
    </el-form-item>
    <el-form-item label="访问路径" prop="pageWebPath">
      <el-input v-model="form.pageWebPath"></el-input>
    </el-form-item>
    <el-form-item label="物理路径" prop="pagePhysicalPath">
      <el-input v-model="form.pagePhysicalPath"></el-input>
    </el-form-item>
    <el-form-item label="类型">
      <el-radio v-model="form.pageType" label="0">静态</el-radio>
      <el-radio v-model="form.pageType" label="1">动态</el-radio>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
      <el-button @click="resetForm('form')">重置</el-button>
      <el-button @click="go_back">返回</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import * as cmsApi from '../api/cms'

  export default {
    data () {
      return {
        form: {
          pageId: '',
          siteId: '',
          templateId: '',
          pageName: '',
          pageAliase: '',
          pageWebPath: '',
          pagePhysicalPath: '',
          pageType: '0'
        },
        siteList: [],
        pageTemplateList: [],
        rules: {
          siteId: [
            {required: true, message: '请至少选择一个所属站点', trigger: 'change'}
          ],
          templateId: [
            {required: true, message: '请至少选择一个模版', trigger: 'change'}
          ],
          pageName: [
            {required: true, message: '请输入页面名称', trigger: 'blur'},
          ],
          pageWebPath: [
            {required: true, message: '请输入访问路径', trigger: 'blur'},
          ],
          pagePhysicalPath: [
            {required: true, message: '请输入物理路径', trigger: 'blur'},
          ],
        }
      }
    },
    methods: {
      searchAllCmsSite () {
        cmsApi.searchAllCmsSite().then(value => {
          this.siteList = value.queryResult.list
        })
      },
      searchAllCmsTemplate () {
        cmsApi.searchAllCmsTemplate().then(value => {
          this.pageTemplateList = value.queryResult.list
        })
      },
      submitForm (formName) {
        //检验规则
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //确认提交
            this.$confirm('确认提交表单?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'})
              .then(() => {
                cmsApi.updateCmsPage(this.form).then(res => {
                  if (!res.success) {
                    //更新失败
                    this.$message({type: 'error', message: '更新失败，' + res.message})
                  } else {
                    this.$message({type: 'success', message: '更新成功!'})
                    //重置表单
                    this.go_back()
                  }
                })
              })
          } else {
            return false
          }
        })
      },
      //重置表单
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      go_back () {
        this.$router.push({
          path: '/cms/page/list', query: {
            page: this.$route.query.page,
            siteId: this.$route.query.siteId
          }
        })
      }
    },
    //钩子函数，一进来默认查询页面
    created () {
      //页面参数通过路由传入，这里通过this.$route.params来获取
      this.form.pageId = this.$route.params.pageId
      cmsApi.getCmsPageById(this.form.pageId).then((res) => {
        if (res.success) {
          // //根据主键查询页面信息
          console.log(res)
          this.form = res.cmsPage
        }
      })
      this.searchAllCmsSite()
      this.searchAllCmsTemplate()
    }
  }
</script>

<style scoped>

</style>

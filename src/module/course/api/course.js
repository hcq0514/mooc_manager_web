import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;

//查询课程列表
//我的课程列表
export const findCourseList = (page,size,params) => {
//使用工具类将json对象转成key/value
  let queries = querystring.stringify(params)
  return http.requestQuickGet(apiUrl+"/course/base/myCourse/"+page+"/"+size+"/1?"+queries)
}

//查询课程分类
export const category_findlist= () => {
  return http.requestQuickGet(apiUrl+'/course/category/list')
}
/*添加课程基础信息*/
export const addCourseBase = params => {
  return http.requestPost(apiUrl+'/course/base/add',params)
}
/*查询课程计划*/
export const findTeachplanList = courseid => {
  return http.requestQuickGet(apiUrl+'/course/teachPlan/list/'+courseid)
}
/*添加课程计划*/
export const addTeachplan = teachplah => {
  return http.requestPost(apiUrl+'/course/teachPlan/add',teachplah)
}

//保存课程图片地址到课程数据 库
export const addCoursePic= (courseId,pic) => {
  return http.requestPost(apiUrl+'/course/coursepic/add?courseId='+courseId+"&pic="+pic)
}
//查询课程图片
export const findCoursePicList = courseId => {
  return http.requestQuickGet(apiUrl+'/course/coursepic/list/'+courseId)
}

//删除课程图片
export const deleteCoursePic= courseId => {
  return http.requestDelete(apiUrl+'/course/coursepic/delete?courseId='+courseId)
}
/*预览课程*/
export const preview = id => {
  return http.requestPost(apiUrl+'/course/preview/'+id);
}
/*发布课程*/
export const publish = id => {
  return http.requestPost(apiUrl+'/course/publish/'+id);
}
//查询课程信息
export const findCourseView = courseId => {
  return http.requestQuickGet(apiUrl+'/course/courseview/'+courseId)
}

/*保存媒资信息*/
export const savemedia = teachplanMedia => {
  return http.requestPost(apiUrl+'/course/savemedia',teachplanMedia);
}

/*根据ID查询课程基本信息*/
export const getCoursebaseById = courseId => {
  return http.requestQuickGet(apiUrl + '/course/base/get/' + courseId);
}
/*修改课程基本信息*/
export const updateCoursebase = (course) => {
  return http.requestPut(apiUrl + '/course/base/update' , course);
}
/*根据ID查询课程营销信息*/
export const getCourseMarketById = id => {
  return http.requestQuickGet(apiUrl + '/course/market/get/' + id);
}
/*修改课程营销信息*/
export const updateCourseMarket = (coursemarket) => {
  return http.requestPut(apiUrl + '/course/market/update' , coursemarket);
}

<template>
  <div class="menu-form">
    <el-form :ref="menuFormRef"
             :rules="rules"
             :model="menuForm"
             label-position="left"
             label-width="120px"
             style="margin:0px 50px;">
      <el-form-item label="角色名称"
                    prop="name">
        <el-input  v-model="menuForm.name"
                        placeholder="请输入角色名称" />
      </el-form-item>
      <el-form-item label="链接"
                    prop="href">
        <el-input  v-model="menuForm.href"
                        placeholder="请输入链接" />
      </el-form-item>
      <el-form-item label="是否显示"
                    prop="show_flag">
        <el-radio v-model="menuForm.sys_flag" label="1">是</el-radio>
        <el-radio v-model="menuForm.sys_flag" label="0">否</el-radio>
      </el-form-item>
      <el-form-item label="权限编码"
                    prop="permission">
        <el-input  v-model="menuForm.permission"
                        placeholder="请输入链接" />
      </el-form-item>
            <el-form-item label="排序"
                    prop="sort">
        <el-input  v-model="menuForm.sort"
                        placeholder="请输入链接" />
      </el-form-item>
      <el-form-item label="备注说明">
        <el-input 
            type="textarea"
            v-model="menuForm.remarks" />
      </el-form-item>
    </el-form>
    <div slot="footer"
         class="dialog-footer">
      <el-button @click="handleCancel">
        取消
      </el-button>
      <el-button type="primary"
                 @click="dialogStatus==='create'?createData():updateData()">
        确定
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      menuFormRef: 'menuFormRef',
      menuForm: {
        name: '',
        href: '',
        icon: '',
        show_flag: '',
        permission: '',
        remarks: '',
        sort: ''
      }
    }
  }
}
</script>

<style>

</style>

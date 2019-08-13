<template>
  <div>
    <el-form :ref="roleFormRef"
             :rules="rules"
             :model="roleForm"
             label-position="left"
             label-width="120px"
             style="margin:0px 50px;">
      <el-form-item label="角色名称"
                    prop="name">
        <el-input  v-model="roleForm.name"
                        placeholder="请输入角色名称" />
      </el-form-item>
      <el-form-item label="是否为系统角色"
                    prop="title">
        <el-radio v-model="roleForm.sys_flag" label="1">是</el-radio>
        <el-radio v-model="roleForm.sys_flag" label="0">否</el-radio>
      </el-form-item>
      <el-form-item label="备注说明">
        <el-input 
            type="textarea"
            v-model="roleForm.remarks" />
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
import { create, update } from '@/api/role/index'
export default {
    props: [
        'dialogStatus'
    ],
  data () {
    return {
      roleForm: this.initForm(),
      roleFormRef: 'roleFormRef',
      rules: {
           name: [{ required: true, trigger: 'blur', message:'名称不能唯空!'}]
      }
    }
  },
  methods: {
      initForm(){
          return{
            id: null,
            name: '',
            email: '',
            remarks: ''
          }
      },
      createData(){
            this.$refs[this.roleFormRef].validate((validate) => {
                if (validate) {
                    create(this.roleForm).then(() => {
                        this.handleCancel()
                    })
                }else {
                    return false
                }
         })
      },
      updateData(){
           this.$refs[this.roleFormRef].validate((validate) => {
                if (validate) {
                    update(this.roleForm).then(() => {
                        this.handleCancel()
                    })
                }else {
                    return false
                }
         })
      },
      resetForm(){
        this.roleForm = this.initForm()
      },
      updateForm(row){
        this.roleForm = row
      },
      handleCancel(){
          this.$emit('handleCancel')
      }
  }
}
</script>

<style>
</style>

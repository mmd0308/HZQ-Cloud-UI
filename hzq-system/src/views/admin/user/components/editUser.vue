<template>
  <div>
    <el-form ref="dataForm"
             :rules="rules"
             :model="userForm"
             label-position="left"
             label-width="90px"
             style="width: 400px; margin-left:50px;">
      <el-form-item label="用户登陆名:"
                    prop="timestamp">
        <el-date-picker v-model="userForm.username"
                        type="input"
                        placeholder="Please pick a date" />
      </el-form-item>
      <el-form-item label="邮箱"
                    prop="title">
        <el-input v-model="userForm.email" />
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="userForm.phone" />
      </el-form-item>
    </el-form>
    <div slot="footer"
         class="dialog-footer">
      <el-button @click="dialogFormVisible = false">
        Cancel
      </el-button>
      <el-button type="primary"
                 @click="dialogStatus==='create'?createData():updateData()">
        Confirm
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userForm: {
        username: '',
        email: '',
        phone: ''
      }
    }
  }
}
</script>

<style>
</style>

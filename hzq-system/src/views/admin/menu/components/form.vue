<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="line-height: 32px;">菜单详情</span>
      <div style=" float:right;padding-right:15px;">
        <el-button v-if="formStatus === 'see'" size="small" type="primary" icon="el-icon-plus" @click="handleCreate">新增</el-button>
        <el-button v-if="formStatus === 'see'" size="small" type="success" icon="el-icon-edit" @click="handleUpdate">修改</el-button>
        <el-button v-if="formStatus === 'see'" size="small" type="danger" icon="el-icon-delete" @click="handleDelete">删除</el-button>
        <el-button v-if="formStatus === 'see'" size="small" type="info" icon="el-icon-refresh" @click="handleReset">重置</el-button>
        <el-button v-if="formStatus != 'see'" type="primary" size="small" icon="el-icon-check" @click="formStatus==='create'?createData():updateData()">保存</el-button>
        <el-button v-if="formStatus != 'see'" type="info" size="small" icon="el-icon-close" @click="handleCancel">取消</el-button>
      </div>
    </div>
    <div class="menu-form">
      <el-form :ref="dataFormRef" :rules="rules" :model="menuForm" label-position="left" label-width="120px" style="margin:0px 50px;">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-if="formStatus === 'see'" :disabled="true" v-model="menuForm.name" placeholder="请输入菜单名称" />
          <el-input v-else v-model="menuForm.name" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item label="链接" prop="href">
          <el-input v-if="formStatus === 'see'" :disabled="true" v-model="menuForm.href" placeholder="请输入链接" />
          <el-input v-else v-model="menuForm.href" placeholder="请输入链接" />
        </el-form-item>
        <el-form-item label="是否显示" prop="showFlag">
          <el-radio v-if="formStatus === 'see'" :disabled="true" v-model="menuForm.showFlag" label="1">是</el-radio>
          <el-radio v-else v-model="menuForm.showFlag" label="1">是</el-radio>
          <el-radio v-if="formStatus === 'see'" :disabled="true" v-model="menuForm.showFlag" label="0">否</el-radio>
          <el-radio v-else v-model="menuForm.showFlag" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="权限编码" prop="permission">
          <el-input v-if="formStatus === 'see'" :disabled="true" v-model="menuForm.permission" placeholder="请输入权限编码" />
          <el-input v-else v-model="menuForm.permission" placeholder="请输入权限编码">
            <template slot="prepend">{{ permissionPrefix}}</template>
          </el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-if="formStatus === 'see'" :disabled="true" v-model="menuForm.sort" placeholder="请输入排序" />
          <el-input v-else v-model="menuForm.sort" placeholder="请输入排序" />
        </el-form-item>
        <el-form-item label="备注说明">
          <el-input v-if="formStatus === 'see'" :disabled="true" type="textarea" v-model="menuForm.remarks" />
          <el-input v-else type="textarea" v-model="menuForm.remarks" />
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import { create, update, deleteById } from '@/api/common/index'
import { checkPermission } from '@/api/menu/index'
export default {
  data() {
    const validatePermission = (menu, value, callback) => {
      if (value === '') {
        callback(new Error('请输入权限编码'))
      } else {
        if (!/^[A-Z]+$/.test(value)) {
          callback(new Error('权限编码必须是大写字母'))
        }
        checkPermission(this.menuForm).then(response => {
          if (!response.attributes) {
            callback(new Error('权限编码重复'))
          }
          callback()
        })
      }
    }
    return {
      moudle: 'menus',
      formStatus: 'see',
      dataFormRef: 'dataFormRef',
      menuForm: this.initForm(),
      top: false, // 是否是第一级别菜单,
      permissionPrefix: '', // 权限编码前缀,服务的权限编码加冒号
      rules: {
        name: [{ required: true, trigger: 'blur', message: '名称不能唯空!' }],
        showFlag: {
          required: true,
          message: '请选择是否显示',
          trigger: 'change'
        },
        permission: {
          required: true,
          trigger: 'blur',
          validator: validatePermission
        }
      }
    }
  },
  methods: {
    initForm() {
      return {
        id: '',
        parentId: '',
        name: '',
        href: '',
        icon: '',
        showFlag: '',
        serveId: '',
        permission: '',
        remarks: '',
        sort: ''
      }
    },
    handleCreate() {
      this.formStatus = 'create'
      const serveId = this.menuForm.serveId
      var parentId = this.menuForm.id
      var parentIds = this.menuForm.parentIds + ',' + this.menuForm.id
      this.resetForm()
      if (this.top) {
        // 没有点击左侧树木,添加的是顶级菜单
        parentId = 0
        parentIds = 0
      }
      this.menuForm.serveId = serveId
      this.menuForm.parentId = parentId
      this.menuForm.parentIds = parentIds
    },
    createData() {
      this.$refs[this.dataFormRef].validate(validate => {
        if (validate) {
          this.menuForm.permission =
            this.permissionPrefix + this.menuForm.permission
          create(this.moudle, this.menuForm).then(() => {
            this.handleCancel()
          })
        } else {
          return false
        }
      })
    },
    handleUpdate() {
      this.formStatus = 'update'
      // 去掉前缀
      this.menuForm.permission = this.menuForm.permission.split(':')[1]
    },
    updateData() {
      this.$refs[this.dataFormRef].validate(validate => {
        if (validate) {
          this.menuForm.permission =
            this.permissionPrefix + this.menuForm.permission
          update(this.moudle, this.menuForm).then(() => {
            this.handleCancel()
          })
        } else {
          return false
        }
      })
    },
    handleCancel() {
      this.formStatus = 'see'
      this.refreshTree()
    },
    handleDelete() {
      this.$confirm('此操作将永久删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        typr: 'warning'
      }).then(() => {
        deleteById(this.moudle, this.menuForm.id).then(() => {
          this.refreshTree()
        })
      })
    },
    refreshTree() {
      // 更新树
      this.$emit('handleRefreshTree')
    },
    handleReset() {
      this.refreshTree()
    },
    seeMenu(data, serveId, top, servePerm) {
      this.resetForm()
      this.formStatus = 'see'
      if (data !== undefined) {
        this.menuForm = JSON.parse(JSON.stringify(data))
      }
      // 如果该服务没有菜单的情况下,菜单直接关联服务
      this.menuForm.serveId = serveId
      this.permissionPrefix = servePerm + ':'
      this.top = top
      //   this.menuForm.appId = appId
      //   this.top = top
      //   this.menuFormLoading = false
      //   if (this.top) {
      //     this.menuForm.parentName = '无上级菜单'
      //   } else {
      //     if (this.menuForm.parentId !== '-1') {
      //       this.menuForm.parentName = this.$parent.$parent.$refs.treeData.getNode(this.menuForm.parentId).data.name
      //     } else {
      //       this.menuForm.parentName = '无上级菜单'
      //     }
      //   }
    },
    resetForm() {
      this.menuForm = this.initForm()
    }
  }
}
</script>

<style>
</style>

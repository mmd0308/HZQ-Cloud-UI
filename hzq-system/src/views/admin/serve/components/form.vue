<template>
  <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
    <div style="margin:0px 50px;">
      <el-form :ref="dataFormRef" :rules="rules" :model="dataForm" label-position="left" label-width="80px">
        <el-form-item label="服务名称" prop="name">
          <el-input v-model="dataForm.name" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="服务状态" prop="status">
          <el-input v-model="dataForm.status" placeholder="请输入服务状态" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" icon="el-icon-check" @click="formStatus==='create'?createData():updateData()">保存</el-button>
        <el-button type="info" size="small" icon="el-icon-close" @click="handleCancel">取消</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { create, update } from "@/api/common/index";
export default {
  data() {
    return {
      moudle: "serves",
      dialogTitle: "",
      dialogVisible: false,
      formStatus: "create",
      dataForm: this.initForm(),
      dataFormRef: "dataFormRef",
      rules: {
        name: [{ required: true, trigger: "blur", message: "名称不能唯空!" }]
      }
    };
  },
  methods: {
    initForm() {
      return {
        id: null,
        name: "",
        status: ""
      };
    },

    handleCreate() {
      this.dialogVisible = true;
      this.dialogTitle = "创建服务";
      this.resetForm();
    },
    handleUpdate(row) {
      this.dialogVisible = true;
      this.dialogTitle = "更新服务";
      this.formStatus = "update";
      this.resetForm();
      this.dataForm = row;
    },
    createData() {
      this.$refs[this.dataFormRef].validate(validate => {
        if (validate) {
          create(this.moudle, this.dataForm).then(() => {
            this.handleCancel();
          });
        } else {
          return false;
        }
      });
    },
    updateData() {
      this.$refs[this.dataFormRef].validate(validate => {
        if (validate) {
          update(this.moudle, this.dataForm).then(() => {
            this.handleCancel();
          });
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.dataForm = this.initForm();
    },
    updateForm(row) {
      this.dataForm = row;
    },
    handleCancel() {
      this.dialogVisible = false;
      this.$emit("refreshList");
    }
  }
};
</script>

<style>
</style>

<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="padding-bottom:15px;">
        <el-input style="width:200px; padding-right:10px;" size="small" v-model="pageQuery.username" placeholder="请输入内容" @keyup.enter.native="handleFilter"></el-input>
        <el-button size="small" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleCreate">新增</el-button>
      </div>
    </div>
    <el-table :data="tableData" fit v-loading="tableLoading" highlight-current-row style="width: 100%">
      <el-table-column prop="name" label="服务名称" />
      <el-table-column prop="status" label="服务状态" />
      <el-table-column prop="permission" label="权限编码" />
      <el-table-column prop="create_time" label="创建时间" />
      <el-table-column prop="update_time" label="更新时间" />
      <el-table-column label="操作" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button size="small" type="success" icon="el-icon-edit" @click="handleUpdate(row)"></el-button>
          <el-button size="small" type="danger" icon="el-icon-delete" @click="handleDelete(row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageQuery.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="pageQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <serve-form ref="dataForm" @refreshList="refreshList" />
  </div>
</template>

  <script>
import { page } from '@/api/common/index'
import { deleteById } from '@/api/common/index'
import ServeForm from './components/form'
export default {
  data() {
    return {
      moudle: 'serves',
      tableLoading: false,
      pageQuery: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      tableData: []
    }
  },
  created() {
    this.handlePage()
  },
  components: {
    ServeForm
  },
  methods: {
    handlePage() {
      this.tableLoading = true
      page(this.moudle, this.pageQuery).then(res => {
        this.tableData = res.attributes.records
        this.total = res.attributes.total
        this.tableLoading = false
      })
    },
    handleCreate() {
      this.$refs['dataForm'].handleCreate()
    },
    handleUpdate(row) {
      this.$refs['dataForm'].handleUpdate(row)
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除?', '删除警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        typr: 'warning'
      }).then(() => {
        deleteById(this.moudle, id).then(() => {
          this.refreshList()
        })
      })
    },
    handleSizeChange(val) {
      this.pageQuery.pageSize = val
      this.pageRequest()
    },
    handleCurrentChange(val) {
      this.pageQuery.pageNum = val
      this.pageRequest()
    },
    handleFilter() {
      this.pageRequest()
    },
    refreshList() {
      this.handlePage()
    }
  }
}
</script>

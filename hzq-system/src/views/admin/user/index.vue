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
      <el-table-column prop="username" label="登录名称">
      </el-table-column>
      <el-table-column prop="phone" label="电话">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="sex" label="性别">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.sex === '0'">男</el-tag>
          <el-tag v-else type="warning">女</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间">
      </el-table-column>
      <el-table-column prop="update_time" label="更新时间">
      </el-table-column>
      <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
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
    <edit-user ref="dataForm" @refreshList="refreshList" />
  </div>
</template>

  <script>
import { page } from '@/api/user/index'
import { deleteById } from '@/api/common/index'
import EditUser from './components/form'
export default {
  data() {
    return {
      moudle: 'users',
      tableLoading: false,
      pageQuery: {
        pageNum: 1,
        pageSize: 10,
        username: ''
      },
      total: 0,
      tableData: []
    }
  },
  created() {
    this.handlePage()
  },
  components: {
    EditUser
  },
  methods: {
    handlePage() {
      this.tableLoading = true
      page(this.pageQuery).then(res => {
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
    refreshList() {
      this.handlePage()
    },
    handleSizeChange(val) {
      this.pageQuery.pageSize = val
      this.handlePage()
    },
    handleCurrentChange(val) {
      this.pageQuery.pageNum = val
      this.handlePage()
    },
    handleFilter() {
      this.handlePage()
    }
  }
}
</script>

<template>
  <el-card style="margin-top:20px" body-style="padding: 10px 20px 20px;" class="box-card">
    <div slot="header" class="clearfix">
      <span style="line-height: 32px;">资源或按钮</span>
      <div style=" float:right;padding-right:15px;">
        <el-input style="width:200px; padding-right:10px;" size="small" v-model="pageQuery.name" placeholder="请输入内容"></el-input>
        <el-button size="small" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleCreate">新增</el-button>
      </div>
    </div>
    <div class="button-container">
      <el-table :data="tableData" fit highlight-current-row style="width: 100%">
        <el-table-column prop="name" label="资源名称">
        </el-table-column>
        <el-table-column prop="permission" label="权限编码">
        </el-table-column>
        <el-table-column prop="elementType" label="资源类型">
        </el-table-column>
        <el-table-column prop="href" label="链接">
        </el-table-column>
        <el-table-column prop="method" label="请求方式">
        </el-table-column>
        <el-table-column prop="description" label="描述">
        </el-table-column>
        <el-table-column prop="update_time" label="更新时间">
        </el-table-column>
        <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button size="mini" type="success" icon="el-icon-edit" @click="handleUpdate(row)"></el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageQuery.pageNum" :page-sizes="[5, 10, 15, 20]" :page-size="pageQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
      <data-form ref="dataForm" @refreshList="refreshList" />
    </div>
  </el-card>
</template>

  <script>
import { deleteById,page } from '@/api/common/index'
import DataForm from './components/form'
export default {
  data () {
    return {
      moudle: 'elements',
      pageQuery: {
        pageNum: 1,
        pageSize: 5,
        name: '',
        menuId: ''
      },
      total: 0,
      tableData: [],
      menuId: ''
    }
  },
  components: {
    DataForm
  },
  methods: {
    getMenuId(id){
      // 获取菜单id
      this.menuId = id
      this.pageQuery.menuId = id
      this.handlePage()
    },
    handlePage () {
      page(this.moudle,this.pageQuery).then(res => {
        this.tableData = res.attributes.records
        this.total = res.attributes.total
      })
    },
    handleCreate () {
      this.$refs['dataForm'].handleCreate(this.menuId)
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
        deleteById(this.moudle,id).then(() => {
          this.refreshList()
        })
      })
    },
    handleClose () {
        this.handlePage();
        this.dialogVisible = false
    },
    handleSizeChange (val) {
      this.pageQuery = val
      this.pageRequest()
    },
    handleCurrentChange (val) {
      this.pageNum = val
      this.pageRequest()
    },
    handleFilter () {
      this.pageRequest();
    },
    refreshList () {
      this.handlePage()
    }
  }
}
</script>

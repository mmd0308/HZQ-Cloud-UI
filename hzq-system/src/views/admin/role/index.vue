<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="pageQuery.username"
                placeholder="用户名称"
                style="width: 200px;"
                class="filter-item"
                @keyup.enter.native="handleFilter" />
      <el-button class="filter-item"
                 type="primary"
                 icon="el-icon-search"
                 @click="handleFilter">
        查询
      </el-button>
      <el-button class="filter-item"
                 style="margin-left: 10px;"
                 type="primary"
                 icon="el-icon-edit"
                 @click="handleCreate">
        新增
      </el-button>
    </div>
    <el-table :data="tableData"
              fit
              highlight-current-row
              style="width: 100%">
      <el-table-column prop="name"
                       label="角色名称"
                       width="180">
      </el-table-column>
      <el-table-column prop="create_time"
                       label="创建时间">
      </el-table-column>
      <el-table-column prop="update_time"
                       label="更新时间">
      </el-table-column>
            <el-table-column prop="remarks"
                       label="备注说明">
      </el-table-column>
      <el-table-column label="操作"
                       align="center"
                       width="200"
                       class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary"
                     size="mini"
                     @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button size="mini"
                     type="danger"
                     @click="handleModifyStatus(row,'deleted')">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
        <el-pagination @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageQuery.pageNum"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="pageQuery.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
        </el-pagination>
    </div>
    <el-dialog :title="dialogTitle"
               :visible.sync="dialogVisible"
               width="50%"
               :before-close="handleClose">
      <role-form ref="roleForm" :dialogStatus="dialogStatus" @handleCancel = "handleClose" />
    </el-dialog>
  </div>
</template>

  <script>
import { page } from '@/api/role/index'
import roleForm from './components/roleForm'
export default {
  data () {
    return {
      dialogVisible: false,
      dialogStatus: 'create',
      dialogTitle: '',
      pageQuery: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      tableData: []
    }
  },
  created () {
    this.handlePage()
  },
  components: {
    roleForm
  },
  methods: {
    handlePage () {
      page(this.pageQuery).then(res => {
        this.tableData = res.attributes.records
        this.total = res.attributes.total
      })
    },
    handleCreate () {
      this.dialogVisible = true
      this.dialogTitle = '创建角色'
      this.$refs['roleForm'].resetForm()
    },
    handleUpdate (row) {
      this.dialogVisible = true
      this.dialogTitle = '修改角色'
      this.dialogStatus = 'update'
      this.$refs['roleForm'].updateForm(row)
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
    }
  }
}
</script>

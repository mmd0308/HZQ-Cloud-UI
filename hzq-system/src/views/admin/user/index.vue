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
      <el-button :loading="downloadLoading"
                 class="filter-item"
                 type="primary"
                 icon="el-icon-download">
        导出
      </el-button>
    </div>
    <el-table :data="tableData"
              fit
              highlight-current-row
              style="width: 100%">
      <el-table-column prop="username"
                       label="登录名称"
                       width="180">
      </el-table-column>
      <el-table-column prop="phone"
                       label="电话"
                       width="180">
      </el-table-column>
      <el-table-column prop="email"
                       label="邮箱" />
      <el-table-column prop="sex"
                       label="性别">
      </el-table-column>
      <el-table-column prop="create_time"
                       label="创建时间">
      </el-table-column>
      <el-table-column prop="update_time"
                       label="更新时间">
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
    <el-dialog title="提示"
               :visible.sync="dialogVisible"
               width="50%"
               :before-close="handleClose">
      <edit-user />
    </el-dialog>
  </div>
</template>

  <script>
import { page } from '@/api/user/index'
import EditUser from './components/editUser'
export default {
  data () {
    return {
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      dialogVisible: false,
      pageQuery: {
        pageNum: 1,
        pageSize: 10,
        username: ''
      },
      total: 0,
      tableData: []
    }
  },
  created () {
    this.pageRequest()
  },
  components: {
    EditUser
  },
  methods: {
    pageRequest () {
      page(this.pageQuery).then(res => {
        this.tableData = res.attributes.records
        this.total = res.attributes.total
      })
    },
    handleCreate () {
      this.dialogVisible = true
    },
    handleClose () {
      this.dialogVisible = true
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

<template>
      <div class="app-container">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column
            label="按钮名称">
            <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column
            prop="permission"
            label="权限编码">
            </el-table-column>
            <el-table-column
            prop="create_time"
            label="创建时间"
            show-overflow-tooltip>
            </el-table-column>
        </el-table>
      </div>
</template>

<script>
export default {
    data() {
      return {
        tableData: [{
          create_time: '2016-05-03',
          name: '王小虎',
          permission: '上海市普陀区金沙江路 1518 弄'
        }, {
          create_time: '2016-05-02',
          name: '王小虎',
          permission: '上海市普陀区金沙江路 1518 弄'
        }, {
          create_time: '2016-05-04',
          name: '王小虎',
          permission: '上海市普陀区金沙江路 1518 弄'
        }, {
          create_time: '2016-05-01',
          name: '王小虎',
          permission: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: []
      }
    },

    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  }
</script>

<style>

</style>

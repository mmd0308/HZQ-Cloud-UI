<template>
  <div class="app-container">

    <el-col :span="5" style="padding-right:20px;">
      <el-select v-model="serveId" filterable placeholder="请选择服务" style="width:100%;padding-bottom:10px" @change="handleServeChange">
        <el-option v-for="item in serveDatas" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>

      <el-card>
        <el-tree v-loading="treeLoading" ref="treeData" :data="treeDate" :props="treeProps" element-loading-text="拼命加载中..." element-loading-spinner="el-icon-loading" node-key="id" default-expand-all @node-click="handleNodeClick" />
      </el-card>
    </el-col>
    <el-col :span="19">
      <menu-form ref="menuForm" :formStatus="formStatus" @handleRefreshTree="handleRefreshTree" />
      <button-index ref="butList" />
    </el-col>
  </div>
</template>
<script>
import MenuForm from './components/form'
import ButtonIndex from '@/views/admin/element/index'
import { serveList } from '@/api/serve/index'
import { tree } from '@/api/menu/index'
export default {
  components: {
    MenuForm,
    ButtonIndex
  },
  data() {
    return {
      serveDatas: [],
      treeProps: {
        label: 'name'
      },
      formStatus: 'see',
      treeDate: [],
      treeLoading: false,
      serveId: '',
      servePerm: '',
      top: false
    }
  },
  created() {
    this.handlerServerQuery()
  },
  methods: {
    handlerServerQuery() {
      serveList(null).then(res => {
        this.serveDatas = res.attributes
        // 选中第一个
        this.serveId = res.attributes[0].id
        this.servePerm = res.attributes[0].permission
        // 加载菜单
        this.handlerMenuTree()
      })
    },
    handleServeChange() {
      this.handlerMenuTree()
    },
    handlerMenuTree() {
      tree(this.serveId).then(res => {
        this.treeDate = res.attributes
        this.top = true
        // 加载完成数据,默认查看第一个
        if (this.treeDate.length !== 0) {
          this.handleNodeClick(this.treeDate[0])
        } else {
          this.$refs.menuForm.seeMenu(
            undefined,
            this.serveId,
            this.top,
            this.servePerm
          )
        }
        this.top = false
      })
    },
    handleNodeClick(data) {
      // 更新右边查看菜单项目
      this.$refs.menuForm.seeMenu(data, this.serveId, this.top, this.servePerm)
      this.$refs.butList.getMenuId(data.id)
    },
    handleRefreshTree() {
      this.handlerMenuTree()
    }
  }
}
</script>

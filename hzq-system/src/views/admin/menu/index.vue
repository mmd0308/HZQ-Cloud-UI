<template>
  <div class="app-container">
    <el-col :span="5" style="padding-right:20px;">
      <el-select v-model="applicationId" filterable placeholder="请选择应用" style="width:100%;padding-bottom:10px">
        <el-option
          v-for="item in applicationDatas"
          :key="item.id"
          :label="item.name"
          :value="item.id"/>
      </el-select>
      <el-card>
        <el-tree
          v-loading="treeLoading"
          ref="treeData"
          :data="treeDate"
          :props="treeProps"
          element-loading-text="拼命加载中..."
          element-loading-spinner="el-icon-loading"
          node-key="id"
          default-expand-all
          @node-click="handleNodeClick"/>
      </el-card>
      
    </el-col>
    <el-col :span="19">
        <menu-form />
      <!-- <menu-form ref="form" @refreshTree="refreshTree" />
      <button-index ref="butList" /> -->
      <button-index />
    </el-col>
  </div>
</template>
<script>
//import { selectMenuTree, selectApplicationListAll } from '@/api/system/menu/index'

import MenuForm from './components/menuForm'
import ButtonIndex from '@/views/admin/button/index'
export default {
  components: {
    MenuForm,
    ButtonIndex
  },
  data() {
    return {
      treeProps: {
        label: 'label'
      },
      treeDate: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
      treeLoading: false,
      applicationDatas: [
          {id:1,name:1}
      ],
      applicationId: '',
      top: false
    }
  },
  created() {
  },
  methods: {
  
  }
}
</script>

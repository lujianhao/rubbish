<template>
  <a-modal
      centered
      v-model="visible"
      :title="title"
      width="60%"
      @ok="isOk"
      @cancel="dialogClose"
  >
    <div style="padding-bottom: 10px;border-bottom: 1px solid #f0f0f0;">
      <a-form-model layout="inline">
        <template v-if="type === 'roleUser'">
          <a-form-model-item label="员工姓名">
            <a-input placeholder="请输入员工姓名" v-model="form.name" allowClear style="width: 150px;" />
          </a-form-model-item>
          <a-form-model-item label="员工工号">
            <a-input placeholder="请输入员工工号" v-model="form.workNum" allowClear style="width: 150px;" />
          </a-form-model-item>
          <a-form-model-item label="分厂名称">
            <a-select
                model="default"
                placeholder="请选择分厂名称"
                :allowClear="true"
                v-model="form.branch"
                @change="fcSelectChange"
            >
              <a-select-option v-for="item in fcSelectData" :key="item.id" :value="item.name">{{item.name}}</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="车间名称">
            <a-select
                model="default"
                placeholder="请选择车间名称"
                :allowClear="true"
                v-model="form.workshop"
            >
              <a-select-option v-for="item in cjSelectData" :key="item.id" :value="item.name">{{item.name}}</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="primary" icon="search" @click="searchData(type, 'ts')">查询</a-button>
          </a-form-model-item>
        </template>
        <template v-else>
          <a-form-model-item label="名称">
            <a-input placeholder="请输入名称" v-model="form.name" allowClear />
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="primary" icon="search" @click="searchData(type, 'ts')">查询</a-button>
          </a-form-model-item>
        </template>
      </a-form-model>
    </div>
    <div>
      <a-checkbox-group v-model="selectData" style="width: 100%;">
        <a-row>
          <a-col :span="6" v-for="item in selectList" :key="item.id" style="line-height: 40px; border-bottom: 1px solid #f0f0f0;">
            <a-checkbox :value="item">{{ type === 'roleUser' ? item.name : item.qxlbMc }}</a-checkbox>
          </a-col>
        </a-row>
      </a-checkbox-group>
    </div>
    <div class="project-table-pagination">
      <a-pagination
          :current="form.pageNo"
          :page-size="form.pageSize"
          :total="paginationTotal"
          :show-total="total => `共${total}条数据`"
          @change="pageChange"
      />
    </div>
  </a-modal>
</template>

<script>
import { roleSearchAdd1, roleSearchAdd2, roleAdd1, roleAdd2, workshopAdd3, workshopSearchAdd } from '@/api/basic'
export default {
  data() {
    return {
      visible: false, // 弹窗控制
      title: '', // 弹窗标题
      type: '', // 弹窗类型
      form: {
        id: '',
        pageNo: 1,
        pageSize: 20
      }, // 查询条件
      paginationTotal: 0, // 信息总数
      selectList: [], // 选择列表
      selectData: [], // 当前选择数据
      cjSelectData: [] // 车间选择下拉框数据
    }
  },
  computed: {
    fcSelectData() {
      return JSON.parse(localStorage.getItem('unitInfo12'))[0].secondLevelArchivesList
    } // 分厂名称下拉框数据
  },
  watch: {
    type () {
      this.searchData(this.type)
    }
  },
  methods: {
    // 查询数据
    searchData(type, ts) {
      if (ts === 'ts') this.form.pageNo = 1
      switch (type) {
        case 'rolePermission':
          roleSearchAdd1(this.form).then(res => {
            if (res) {
              this.selectList = res.data
              this.paginationTotal = res.count
            }
          })
          break
        case 'workshopPermission':
          workshopSearchAdd(this.form).then(res => {
            if (res) {
              this.selectList = res.data
              this.paginationTotal = res.count
            }
          })
          break
        case 'roleUser':
          roleSearchAdd2(this.form).then(res => {
            if (res) {
              this.selectList = res.data
              this.paginationTotal = res.count
            }
          })
          break
      }
    },
    //分厂名称下拉框改变
    fcSelectChange(selectedItems) {
      this.cjSelectData = []
      if (selectedItems) {
        const erSanData = JSON.parse(localStorage.getItem('unitInfo23'))
        erSanData.forEach(item => {
          if (item.name === selectedItems) this.cjSelectData = item.thirdLevelArchivesList
        })
      } else {
        this.form.workshop = undefined
      }
    },
    // 表格分页页码改变
    pageChange(pageNo) {
      this.form.pageNo = pageNo
      this.searchData(this.type)
    },
    // 弹窗确认
    isOk() {
      if (this.selectData.length === 0) {
        this.$message.info(`当前${this.type === 'roleUser' ? '用户' : '权限'}选择为空！`)
      } else {
        if (this.type === 'rolePermission') {
          this.selectData.forEach(item => {
            item.roleId = this.form.id
            item.permissionId = item.id
          })
          roleAdd1(this.selectData).then(res => this.showResult(res))
        } else if (this.type === 'roleUser') {
          this.selectData.forEach(item => {
            item.roleId = this.form.id
            item.userProfileId = item.id
          })
          roleAdd2(this.selectData).then(res => this.showResult(res))
        } else if (this.type === 'workshopPermission') {
          this.selectData.forEach(item => {
            item.threeInstitutionsId = this.form.id
            item.permissionsId = item.id
          })
          workshopAdd3(this.selectData).then(res => this.showResult(res))
        }
      }
    },
    // 展示结果
    showResult(res) {
      if (res) {
        this.$message.success(res)
        this.dialogClose()
        this.visible = false
        this.$emit('selectSuccess')
      }
    },
    // 弹窗关闭
    dialogClose() {
      this.form = {
        id: '',
        pageNo: 1,
        pageSize: 20
      }
      this.selectList = []
      this.selectData = []
      this.paginationTotal = 0
    }
  }
}
</script>

<template>
  <a-modal
    class="special-table-dialog"
    centered
    v-model="visible"
    :title="title"
    width="35%"
    destroyOnClose
    :confirmLoading="okBtnLoading"
    @ok="isOk"
    @cancel="dialogClose"
  >
    <a-form-model ref="ruleForm" :model="form" :rules="rules">
      <a-row :gutter="16" v-if="topTableOperateDialogFlag === 'resumptionSet'">
        <a-col :span="12">
          <a-form-model-item label="车间名称" prop="thirdInstitutionsName">
            <a-select
                model="default"
                placeholder="请选择车间名称"
                v-model="form.thirdInstitutionsName"
                @change="cjSelectChange"
            >
              <a-select-option v-for="item in cjmcSelectData" :key="item.id" :value="item.name">{{ item.name }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="职务" prop="position">
            <a-select
                model="default"
                placeholder="请选择职务"
                v-model="form.position"
            >
              <a-select-option v-for="item in zwSelectData" :key="item.id" :value="item.name">{{ item.name }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="16" v-if="topTableOperateDialogFlag === 'resumptionSubmit'">
        <a-col :span="12">
          <a-form-model-item label="年份" prop="year">
            <a-input disabled placeholder="请输入序号" v-model="form.year" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="月份" prop="month">
            <a-input disabled placeholder="请输入考核要素" v-model="form.month" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="总分" prop="score">
            <a-input disabled placeholder="请输入总分" v-model="form.score" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="描述" prop="note">
            <a-textarea placeholder="请输入描述" v-model="form.note" :auto-size="{ minRows:2, maxRows: 5 }" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="16" v-if="topTableOperateDialogFlag === 'riskPointSet'">
        <a-col :span="12">
          <a-form-model-item label="所在单位" prop="currentUnit">
            <div style="display: flex;align-items: center;height: 40px;">
              <a-input disabled placeholder="请选择所在单位" v-model="form.currentUnit" style="border-right: 0;border-radius: 2px 0 0 2px;" />
              <a-button style="border-right: 0;border-radius: 0 2px 2px 0;" type="primary" @click="unitSelect"><a-icon type="search" /></a-button>
            </div>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="地点" prop="location">
            <a-input placeholder="请输入地点" v-model="form.location" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="16" v-if="topTableOperateDialogFlag === 'riskPointCheck'">
        <a-col :span="12">
          <a-form-model-item label="检查时间" prop="checkTime">
            <a-date-picker style="width: 100%;" v-model="form.checkTime" :valueFormat="'YYYY-MM-DD'" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="是否下整改通知单" prop="dangerListConfirm">
            <a-switch checked-children="是" un-checked-children="否" :default-checked="form.dangerListConfirm === '是'" @change="switchChange($event, 'dangerListConfirm')" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="问题描述" prop="questionDescription">
            <a-textarea placeholder="请输入问题描述" v-model="form.questionDescription" :auto-size="{ minRows:2, maxRows: 6 }" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="整改措施" prop="correctiveMeasures">
            <a-textarea placeholder="请输入整改措施" v-model="form.correctiveMeasures" :auto-size="{ minRows:2, maxRows: 6 }" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="处置人" prop="disposePeople">
            <div style="display: flex;align-items: center;height: 40px;">
              <a-input disabled placeholder="请选择处置人" v-model="form.disposePeople" style="border-right: 0;border-radius: 2px 0 0 2px;" />
              <a-button style="border-right: 0;border-radius: 0 2px 2px 0;" type="primary" @click="userSelect('disposePeople')"><a-icon type="search" /></a-button>
            </div>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="执行人" prop="implementPeople">
            <div style="display: flex;align-items: center;height: 40px;">
              <a-input disabled placeholder="请选择执行人" v-model="form.implementPeople" style="border-right: 0;border-radius: 2px 0 0 2px;" />
              <a-button style="border-right: 0;border-radius: 0 2px 2px 0;" type="primary" @click="userSelect('implementPeople')"><a-icon type="search" /></a-button>
            </div>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="复查人" prop="reviewPeople">
            <div style="display: flex;align-items: center;height: 40px;">
              <a-input disabled placeholder="请选择复查人" v-model="form.reviewPeople" style="border-right: 0;border-radius: 2px 0 0 2px;" />
              <a-button style="border-right: 0;border-radius: 0 2px 2px 0;" type="primary" @click="userSelect('reviewPeople')"><a-icon type="search" /></a-button>
            </div>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="责任部门" prop="responsibilityDepartment">
            <a-select
                model="default"
                placeholder="请选择责任部门"
                :allowClear="true"
                v-model="form.responsibilityDepartment"
            >
              <a-select-option v-for="item in zrbmSelectData" :key="item.id" :value="item.name">{{ item.name }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="隐患分类" prop="hazardClassification">
            <a-select
                model="default"
                placeholder="请选择隐患分类"
                :allowClear="true"
                v-model="form.hazardClassification"
            >
              <a-select-option v-for="item in yhflSelectData" :key="item.id" :value="item.name">{{ item.name }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="隐患分级" prop="hazardLevel">
            <a-select
                model="default"
                placeholder="请选择隐患分级"
                :allowClear="true"
                v-model="form.hazardLevel"
            >
              <a-select-option v-for="item in yhfjSelectData" :key="item.id" :value="item.name">{{ item.name }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="整改期限" prop="correctivePeriod">
            <a-select
                model="default"
                placeholder="请选择整改期限"
                :allowClear="true"
                v-model="form.correctivePeriod"
            >
              <a-select-option v-for="item in zgqxSelectData" :key="item.value" :value="item.value">{{ item.name }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="截至整改日期" prop="deadTime">
            <a-date-picker style="width: 100%;" v-model="form.deadTime" :valueFormat="'YYYY-MM-DD'" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="16" v-if="topTableOperateDialogFlag === 'majorInsceptionSet'">
        <a-col :span="12">
          <a-form-model-item label="序号" prop="num">
            <a-input-number :min="1" :precision="0" placeholder="请输入序号" v-model="form.num" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="专业类型" prop="professionalType">
            <a-input placeholder="请输入专业类型" v-model="form.professionalType" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="检查单位" prop="fillUnit">
            <div style="display: flex;align-items: center;height: 40px;">
              <a-input disabled placeholder="请选择检查单位" v-model="form.fillUnit" style="border-right: 0;border-radius: 2px 0 0 2px;" />
              <a-button style="border-right: 0;border-radius: 0 2px 2px 0;" type="primary" @click="unitSelect"><a-icon type="search" /></a-button>
            </div>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="16" v-if="topTableOperateDialogFlag === 'weeklyWrite'">
        <a-col :span="24">
          <a-form-model-item label="工作内容" prop="workContent">
            <a-textarea placeholder="请输入工作内容" v-model="form.workContent" :auto-size="{ minRows:2, maxRows: 5 }" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="需协调内容" prop="coordinateContent">
            <a-textarea placeholder="请输入需协调内容" v-model="form.coordinateContent" :auto-size="{ minRows:2, maxRows: 5 }" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="16" v-if="topTableOperateDialogFlag === 'weeklyCollect'">
        <a-col :span="24">
          <a-form-model-item label="安全目标未完成原因" prop="unfinishedReason">
            <a-textarea placeholder="请输入安全目标未完成原因" v-model="form.unfinishedReason" :auto-size="{ minRows:2, maxRows: 6 }" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="16" v-if="topTableOperateDialogFlag === 'outsourcedUnitSubmit'">
        <a-col :span="12">
          <a-form-model-item label="外委队名称" prop="outsourceUnitName">
            <a-input placeholder="请输入外委队名称" v-model="form.outsourceUnitName" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="施工单位" prop="constructionUnit">
            <div style="display: flex;align-items: center;height: 40px;">
              <a-input disabled placeholder="请输入施工单位" v-model="form.constructionUnit" style="border-right: 0;border-radius: 2px 0 0 2px;" />
              <a-button style="border-right: 0;border-radius: 0 2px 2px 0;" type="primary" @click="unitSelect"><a-icon type="search" /></a-button>
            </div>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="单位类型" prop="unitType">
            <a-select
                model="default"
                placeholder="请选择单位类型"
                :allowClear="true"
                v-model="form.unitType"
            >
              <a-select-option v-for="item in dwlxSelectData" :key="item.id" :value="item.name">{{ item.name }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="单位地点" prop="unitLocation">
            <a-input placeholder="请输入单位地点" v-model="form.unitLocation" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="负责人" prop="unitPrincipal">
            <a-input placeholder="请输入负责人" v-model="form.unitPrincipal" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="联系人" prop="unitContact">
            <a-input placeholder="请输入联系人" v-model="form.unitContact" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="联系方式" prop="unitInformation">
            <a-input placeholder="请输入联系方式" v-model="form.unitInformation" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="工程名称" prop="projectName">
            <a-input placeholder="请输入工程名称" v-model="form.projectName" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="施工人数" prop="constructionNumber">
            <a-input placeholder="请输入施工人数" v-model="form.constructionNumber" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="工程负责人" prop="projectPrinciple">
            <a-input placeholder="请输入工程负责人" v-model="form.projectPrinciple" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="计划开始时间" prop="startDate">
            <a-date-picker style="width: 100%;" v-model="form.startDate" :valueFormat="'YYYY-MM-DD'" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="计划结束时间" prop="stopDate">
            <a-date-picker style="width: 100%;" v-model="form.stopDate" :valueFormat="'YYYY-MM-DD'" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="16" v-if="topTableOperateDialogFlag === 'outsourcedUnitProcess'">
        <a-col :span="12">
          <a-form-model-item label="工程状态" prop="projectStatus">
            <a-select
                model="default"
                placeholder="请选择工程状态"
                :allowClear="true"
                v-model="form.projectStatus"
            >
              <a-select-option value="计划">计划</a-select-option>
              <a-select-option value="施工">施工</a-select-option>
              <a-select-option value="停工">停工</a-select-option>
              <a-select-option value="完工">完工</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="开始日期" prop="startDate">
            <a-date-picker style="width: 100%;" placeholder="请输入开始日期" v-model="form.startDate" :valueFormat="'YYYY-MM-DD'" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="结束日期" prop="stopDate">
            <a-date-picker style="width: 100%;" placeholder="请输入结束日期" v-model="form.stopDate" :valueFormat="'YYYY-MM-DD'" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="工程内容" prop="projectContent">
            <a-textarea placeholder="请输入工程内容" v-model="form.projectContent" :auto-size="{ minRows:2, maxRows: 6 }" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="施工情况" prop="constructionStatus">
            <a-textarea placeholder="请输入施工情况" v-model="form.constructionStatus" :auto-size="{ minRows:2, maxRows: 6 }" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="16" v-if="topTableOperateDialogFlag === 'outsourcedUnitFileManage'">
        <a-col :span="12">
          <a-form-model-item label="单位状态" prop="unitStatus">
            <a-select
                model="default"
                placeholder="请选择单位状态"
                :allowClear="true"
                v-model="form.unitStatus"
            >
              <a-select-option value="正常">正常</a-select-option>
              <a-select-option value="清退">清退</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="单位地址" prop="unitLocation">
            <a-input placeholder="请输入单位地址" v-model="form.unitLocation" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="联系方式" prop="contactInformation">
            <a-input placeholder="请输入联系方式" v-model="form.contactInformation" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="单位类型" prop="unitType">
            <a-select
                model="default"
                placeholder="请选择单位类型"
                :allowClear="true"
                v-model="form.unitType"
            >
              <a-select-option v-for="item in dwlxSelectData" :key="item.id" :value="item.name">{{ item.name }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="负责人" prop="principle">
            <a-input placeholder="请输入负责人" v-model="form.principle" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="联系人" prop="contact">
            <a-input placeholder="请输入联系人" v-model="form.contact" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="清退原因" prop="downtimeReason">
            <a-textarea placeholder="请输入清退原因" v-model="form.downtimeReason" :auto-size="{ minRows:2, maxRows: 5 }" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="备注" prop="note">
            <a-textarea placeholder="请输入备注" v-model="form.note" :auto-size="{ minRows:2, maxRows: 5 }" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="16" v-if="topTableOperateDialogFlag === 'threeViolationSubmit'">
        <a-col :span="12">
          <a-form-model-item label="三违人员" prop="personFullName">
            <div style="display: flex;align-items: center;height: 40px;">
              <a-input disabled placeholder="请输入三违人员" v-model="form.personFullName" style="border-right: 0;border-radius: 2px 0 0 2px;" />
              <a-button style="border-right: 0;border-radius: 0 2px 2px 0;" type="primary" @click="threeViolationUserSelect('personFullName')"><a-icon type="search" /></a-button>
            </div>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="三违日期" prop="violationDate">
            <a-date-picker style="width: 100%;" :valueFormat="'YYYY-MM-DD'" placeholder="请输入三违日期" v-model="form.violationDate" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="三违地点" prop="violationPlace">
            <a-input placeholder="请输入三违地点" v-model="form.violationPlace" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="反思检查提交人" prop="reflectCheckSubmitter">
            <div style="display: flex;align-items: center;height: 40px;">
              <a-input disabled placeholder="请输入反思检查提交人" v-model="form.reflectCheckSubmitter" style="border-right: 0;border-radius: 2px 0 0 2px;" />
              <a-button style="border-right: 0;border-radius: 0 2px 2px 0;" type="primary" @click="threeViolationUserSelect('reflectCheckSubmitter')"><a-icon type="search" /></a-button>
            </div>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="班长谈话工号" prop="monitorSubmitter">
            <div style="display: flex;align-items: center;height: 40px;">
              <a-input disabled placeholder="请输入班长谈话工号" v-model="form.monitorSubmitter" style="border-right: 0;border-radius: 2px 0 0 2px;" />
              <a-button style="border-right: 0;border-radius: 0 2px 2px 0;" type="primary" @click="threeViolationUserSelect('monitorSubmitter')"><a-icon type="search" /></a-button>
            </div>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="车间主任谈话工号" prop="workshopSubmitter">
            <div style="display: flex;align-items: center;height: 40px;">
              <a-input disabled placeholder="请输入车间主任谈话工号" v-model="form.workshopSubmitter" style="border-right: 0;border-radius: 2px 0 0 2px;" />
              <a-button style="border-right: 0;border-radius: 0 2px 2px 0;" type="primary" @click="threeViolationUserSelect('workshopSubmitter')"><a-icon type="search" /></a-button>
            </div>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="工会主席谈话工号" prop="unionSubmitter">
            <div style="display: flex;align-items: center;height: 40px;">
              <a-input disabled placeholder="请输入工会主席谈话工号" v-model="form.unionSubmitter" style="border-right: 0;border-radius: 2px 0 0 2px;" />
              <a-button style="border-right: 0;border-radius: 0 2px 2px 0;" type="primary" @click="threeViolationUserSelect('unionSubmitter')"><a-icon type="search" /></a-button>
            </div>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="支部书记谈话工号" prop="secretarySubmitter">
            <div style="display: flex;align-items: center;height: 40px;">
              <a-input disabled placeholder="请输入支部书记谈话工号" v-model="form.secretarySubmitter" style="border-right: 0;border-radius: 2px 0 0 2px;" />
              <a-button style="border-right: 0;border-radius: 0 2px 2px 0;" type="primary" @click="threeViolationUserSelect('secretarySubmitter')"><a-icon type="search" /></a-button>
            </div>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="分管领导谈话工号" prop="leaderSubmitter">
            <div style="display: flex;align-items: center;height: 40px;">
              <a-input disabled placeholder="请输入分管领导谈话工号" v-model="form.leaderSubmitter" style="border-right: 0;border-radius: 2px 0 0 2px;" />
              <a-button style="border-right: 0;border-radius: 0 2px 2px 0;" type="primary" @click="threeViolationUserSelect('leaderSubmitter')"><a-icon type="search" /></a-button>
            </div>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="16" v-if="topTableOperateDialogFlag === 'ViolationProcessWrite'">
        <a-col :span="24">
          <a-form-model-item label="违章行为" prop="illegal">
            <a-textarea placeholder="请输入违章行为" v-model="form.illegal" :auto-size="{ minRows:2, maxRows: 5 }" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="16" v-if="topTableOperateDialogFlag === 'safeFeedback'">
        <a-col :span="24">
          <a-form-model-item label="安全补课情况" prop="safetyLessonStatus">
            <a-textarea placeholder="请输入安全补课情况" v-model="form.safetyLessonStatus" :auto-size="{ minRows:2, maxRows: 5 }" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="16" v-if="topTableOperateDialogFlag === 'checkFeedback'">
        <a-col :span="24">
          <a-form-model-item label="反思检查情况" prop="reflectCheckStatus">
            <a-textarea placeholder="请输入反思检查情况" v-model="form.reflectCheckStatus" :auto-size="{ minRows:2, maxRows: 5 }" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="16" v-if="topTableOperateDialogFlag === 'leaderTalkFeedback'">
        <a-col :span="24">
          <a-form-model-item label="班长谈话" prop="monitorStatus">
            <a-textarea placeholder="请输入班长谈话" v-model="form.monitorStatus" :auto-size="{ minRows:2, maxRows: 5 }" />
          </a-form-model-item>
          <a-form-model-item label="车间主任谈话" prop="workshopStatus">
            <a-textarea placeholder="请输入车间主任谈话" v-model="form.workshopStatus" :auto-size="{ minRows:2, maxRows: 5 }" />
          </a-form-model-item>
          <a-form-model-item label="工会主席谈话" prop="unionStatus">
            <a-textarea placeholder="请输入工会主席谈话" v-model="form.unionStatus" :auto-size="{ minRows:2, maxRows: 5 }" />
          </a-form-model-item>
          <a-form-model-item label="支部书记谈话" prop="secretaryStatus">
            <a-textarea placeholder="请输入支部书记谈话" v-model="form.secretaryStatus" :auto-size="{ minRows:2, maxRows: 5 }" />
          </a-form-model-item>
          <a-form-model-item label="分管领导谈话" prop="leaderStatus">
            <a-textarea placeholder="请输入分管领导谈话" v-model="form.leaderStatus" :auto-size="{ minRows:2, maxRows: 5 }" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="16" v-if="topTableOperateDialogFlag === 'familyFeedback'">
        <a-col :span="24">
          <a-form-model-item label="家属协管关" prop="familyManagementStatus">
            <a-textarea placeholder="请输入家属协管关" v-model="form.familyManagementStatus" :auto-size="{ minRows:2, maxRows: 5 }" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="16" v-if="topTableOperateDialogFlag === 'performanceManage'">
        <a-col :span="12">
          <a-form-model-item label="一级要素" prop="primaryElement">
            <a-input placeholder="请输入一级要素" v-model="form.primaryElement" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="二级要素" prop="secondaryElement">
            <a-input placeholder="请输入二级要素" v-model="form.secondaryElement" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="评价要点" prop="evaluationPoints">
            <a-textarea placeholder="请输入评价要点" v-model="form.evaluationPoints" :auto-size="{ minRows:2, maxRows: 5 }" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="评价细则" prop="evaluationRules">
            <a-textarea placeholder="请输入评价细则" v-model="form.evaluationRules" :auto-size="{ minRows:2, maxRows: 5 }" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="标准分值" prop="standardScore">
            <a-input-number :min="1" :precision="0" placeholder="请输入标准分值" v-model="form.standardScore" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="16" v-if="topTableOperateDialogFlag === 'module'">
        <a-col :span="12">
          <a-form-model-item label="序号" prop="qxflXh">
            <a-input-number :min="1" :precision="0" placeholder="请输入序号" v-model="form.qxflXh" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="名称" prop="qxflMc">
            <a-input placeholder="请输入名称" v-model="form.qxflMc" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="路由地址" prop="qxflMkurl">
            <a-input placeholder="请输入路由地址" v-model="form.qxflMkurl" disabled />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="图标" prop="qxflMktb">
            <a-tooltip placement="right">
              <template slot="title">点击选择图标</template>
              <div style="display: flex;align-items: center;justify-content: center;width: 30px;height: 30px;margin-top: 5px;border: 1px solid #dadada;border-radius:5px;cursor:pointer;" @click="iconSelect">
                <a-icon :type="nowIcon" />
              </div>
            </a-tooltip>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="16" v-if="topTableOperateDialogFlag === 'branch'">
        <a-col :span="12">
          <a-form-model-item label="序号" prop="num">
            <a-input-number :min="1" :precision="0" placeholder="请输入序号" v-model="form.num" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="名称" prop="name">
            <a-input placeholder="请输入名称" v-model="form.name" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="风险排查单位" prop="riskInvestigationUnit">
            <a-select
                model="default"
                placeholder="请选择是否是风险排查单位"
                :allowClear="true"
                v-model="form.riskInvestigationUnit"
            >
              <a-select-option value="是">是</a-select-option>
              <a-select-option value="否">否</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="安全管理单位" prop="safeManagementUnit">
            <a-select
                model="default"
                placeholder="请选择是否是安全管理单位"
                :allowClear="true"
                v-model="form.safeManagementUnit"
            >
              <a-select-option value="是">是</a-select-option>
              <a-select-option value="否">否</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="安全天数起始日期" prop="safeDate">
            <a-date-picker style="width: 100%;" placeholder="请输入安全天数起始日期" v-model="form.safeDate" :valueFormat="'YYYY-MM-DD'" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="16" v-if="topTableOperateDialogFlag === 'workshop'">
        <a-col :span="12">
          <a-form-model-item label="序号" prop="num">
            <a-input-number :min="1" :precision="0" placeholder="请输入序号" v-model="form.num" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="名称" prop="name">
            <a-input placeholder="请输入名称" v-model="form.name" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="风险排查单位" prop="riskInvestigationUnit">
            <a-select
                model="default"
                placeholder="请选择是否是风险排查单位"
                :allowClear="true"
                v-model="form.riskInvestigationUnit"
            >
              <a-select-option value="是">是</a-select-option>
              <a-select-option value="否">否</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="安全管理单位" prop="safeManagementUnit">
            <a-select
                model="default"
                placeholder="请选择是否是安全管理单位"
                :allowClear="true"
                v-model="form.safeManagementUnit"
            >
              <a-select-option value="是">是</a-select-option>
              <a-select-option value="否">否</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="16" v-if="topTableOperateDialogFlag === 'role'">
        <a-col :span="12">
          <a-form-model-item label="编号" prop="number">
            <a-input-number :min="1" :precision="0" placeholder="请输入编号" v-model="form.number" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="名称" prop="name">
            <a-input placeholder="请输入名称" v-model="form.name" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="备注" prop="note">
            <a-textarea placeholder="请输入备注" v-model="form.note" :auto-size="{ minRows:2, maxRows: 6 }" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="16" v-if="topTableOperateDialogFlag === 'dictionaries'">
        <a-col :span="12">
          <a-form-model-item label="序号" prop="num">
            <a-input-number :min="1" :precision="0" placeholder="请输入序号" v-model="form.num" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="名称" prop="name">
            <a-input placeholder="请输入名称" v-model="form.name" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="16" v-if="topTableOperateDialogFlag === 'hiddenDanger'">
        <a-col :span="12">
          <a-form-model-item label="序号" prop="number">
            <a-input-number :min="1" :precision="0" placeholder="请输入序号" v-model="form.number" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="名称" prop="name">
            <a-input placeholder="请输入名称" v-model="form.name" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="16" v-if="topTableOperateDialogFlag === 'protectionFile'">
        <a-col :span="12">
          <a-form-model-item label="编号" prop="number">
            <a-input placeholder="请输入编号" v-model="form.number" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="名称" prop="facilityName">
            <a-input placeholder="请输入名称" v-model="form.facilityName" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="安装位置" prop="installLocation">
            <a-input placeholder="请输入安装位置" v-model="form.installLocation" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="车间名称" prop="workshop">
            <a-select
                model="default"
                placeholder="请选择车间名称"
                :allowClear="true"
                v-model="form.workshop"
            >
              <a-select-option v-for="item in cjSelectData" :key="item.id" :value="item.name">{{item.name}}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="使用状态" prop="useStatus">
            <a-select
                model="default"
                placeholder="请选择使用状态"
                :allowClear="true"
                v-model="form.useStatus"
            >
              <a-select-option value="在用">在用</a-select-option>
              <a-select-option value="停用">停用</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="用途" prop="use">
            <a-input placeholder="请输入用途" v-model="form.use" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="参数描述" prop="parameterDescription">
            <a-textarea placeholder="请输入参数描述" v-model="form.parameterDescription" :auto-size="{ minRows:2, maxRows: 5 }" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="责任单位与负责人" prop="responsibleUnit">
            <a-input placeholder="请输入责任单位与负责人" v-model="form.responsibleUnit" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="16" v-if="topTableOperateDialogFlag === 'maintainEmergencyPlan'">
        <a-col :span="12">
          <a-form-model-item label="编号" prop="number">
            <a-input placeholder="请输入编号" v-model="form.number" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="名称" prop="name">
            <a-input placeholder="请输入名称" v-model="form.name" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="层级" prop="hierarchy">
            <a-select
                model="default"
                placeholder="请选择层级"
                :allowClear="true"
                v-model="form.hierarchy"
            >
              <a-select-option value="公司级">公司级</a-select-option>
              <a-select-option value="分厂级">分厂级</a-select-option>
              <a-select-option value="车间级">车间级</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="提交分厂" prop="submitBranch">
            <a-select
                model="default"
                placeholder="请选择提交分厂"
                :allowClear="true"
                v-model="form.submitBranch"
            >
              <a-select-option v-for="item in zrfcSelectData" :key="item.id" :value="item.name">{{ item.name }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="提交单位" prop="submitWorkshop">
            <a-input placeholder="请输入提交单位" v-model="form.submitWorkshop" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="预案描述" prop="planDescription">
            <a-textarea placeholder="请输入预案描述" v-model="form.planDescription" :auto-size="{ minRows:2, maxRows: 5 }" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="16" v-if="topTableOperateDialogFlag === 'safetyTrainingRecord'">
        <a-col :span="12">
          <a-form-model-item label="培训日期" prop="trainDate">
            <a-date-picker style="width: 100%;" :valueFormat="'YYYY-MM-DD'" placeholder="请输入培训日期" v-model="form.trainDate" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="培训层级" prop="trainLevel">
            <a-select
                model="default"
                placeholder="请选择培训层级"
                :allowClear="true"
                v-model="form.trainLevel"
            >
              <a-select-option value="公司级">公司级</a-select-option>
              <a-select-option value="分厂级">分厂级</a-select-option>
              <a-select-option value="车间级">车间级</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="培训内容" prop="trainContent">
            <a-textarea placeholder="请输入培训内容" v-model="form.trainContent" :auto-size="{ minRows:2, maxRows: 5 }" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="实施单位" prop="implementationUnit">
            <a-input placeholder="请输入实施单位" v-model="form.implementationUnit" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="地点" prop="trainPlace">
            <a-input placeholder="请输入地点" v-model="form.trainPlace" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="参加人员" prop="participants">
            <a-input placeholder="请输入参加人员" v-model="form.participants" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="培训讲师" prop="trainer">
            <a-input placeholder="请输入培训讲师" v-model="form.trainer" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="责任分厂" prop="branch">
            <a-select
                model="default"
                placeholder="请选择责任分厂"
                :allowClear="true"
                v-model="form.branch"
                @change="zrfcSelectChange"
            >
              <a-select-option v-for="item in zrfcSelectData" :key="item.id" :value="item.name">{{item.name}}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="责任车间" prop="workshop">
            <a-select
                model="default"
                placeholder="请选择责任车间"
                :allowClear="true"
                v-model="form.workshop"
            >
              <a-select-option v-for="item in zrcjSelectData" :key="item.id" :value="item.name">{{item.name}}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="16" v-if="topTableOperateDialogFlag === 'riskCheckStandard'">
        <a-col :span="12">
          <a-form-model-item label="序号" prop="number">
            <a-input-number :min="1" :precision="0" placeholder="请输入序号" v-model="form.number" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="地点" prop="place">
            <a-input placeholder="请输入地点" v-model="form.place" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="设备设施/作业活动" prop="equipment">
            <a-input placeholder="请输入设备设施/作业活动" v-model="form.equipment" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="排查岗位" prop="positionCheck">
            <a-input placeholder="请输入排查岗位" v-model="form.positionCheck" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="危险源" prop="riskSource">
            <a-textarea placeholder="请输入危险源" v-model="form.riskSource" :auto-size="{ minRows:2, maxRows: 5 }" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="危害因素" prop="riskfactors">
            <a-textarea placeholder="请输入危害因素" v-model="form.riskfactors" :auto-size="{ minRows:2, maxRows: 5 }" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="事故后果" prop="consequences">
            <a-input placeholder="请输入事故后果" v-model="form.consequences" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="固有等级l" prop="inherentRankL">
            <a-select
                model="default"
                placeholder="请选择固有等级l"
                :allowClear="true"
                v-model="form.inherentRankL"
                @change="djChange('inherentRankL')"
            >
              <a-select-option value="0.1">0.1</a-select-option>
              <a-select-option value="0.2">0.2</a-select-option>
              <a-select-option value="0.5">0.5</a-select-option>
              <a-select-option value="1">1</a-select-option>
              <a-select-option value="3">3</a-select-option>
              <a-select-option value="6">6</a-select-option>
              <a-select-option value="10">10</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="固有等级e" prop="inherentRankE">
            <a-select
                model="default"
                placeholder="请选择固有等级e"
                :allowClear="true"
                v-model="form.inherentRankE"
                @change="djChange('inherentRankE')"
            >
              <a-select-option value="0.5">0.5</a-select-option>
              <a-select-option value="1">1</a-select-option>
              <a-select-option value="2">2</a-select-option>
              <a-select-option value="3">3</a-select-option>
              <a-select-option value="6">6</a-select-option>
              <a-select-option value="10">10</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="固有等级c" prop="inherentRankC">
            <a-select
                model="default"
                placeholder="请选择固有等级c"
                :allowClear="true"
                v-model="form.inherentRankC"
                @change="djChange('inherentRankC')"
            >
              <a-select-option value="1">1</a-select-option>
              <a-select-option value="3">3</a-select-option>
              <a-select-option value="7">7</a-select-option>
              <a-select-option value="15">15</a-select-option>
              <a-select-option value="40">40</a-select-option>
              <a-select-option value="100">100</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="固有等级d" prop="inherentRankD">
            <a-input placeholder="请输入固有等级d" v-model="form.inherentRankD" disabled />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="固有等级" prop="inherentRank">
            <a-select
                model="default"
                placeholder="请选择固有等级"
                :allowClear="true"
                v-model="form.inherentRank"
                disabled
            >
              <a-select-option value="重大">重大</a-select-option>
              <a-select-option value="较大">较大</a-select-option>
              <a-select-option value="一般">一般</a-select-option>
              <a-select-option value="低">低</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="技术措施" prop="technicalMeasures">
            <a-textarea placeholder="请输入技术措施" v-model="form.technicalMeasures" :auto-size="{ minRows:2, maxRows: 5 }" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="管理措施" prop="managermentMeasures">
            <a-textarea placeholder="请输入管理措施" v-model="form.managermentMeasures" :auto-size="{ minRows:2, maxRows: 5 }" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="教育措施" prop="educationalMeasures">
            <a-textarea placeholder="请输入教育措施" v-model="form.educationalMeasures" :auto-size="{ minRows:2, maxRows: 5 }" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="个体防护措施" prop="personalProtectiveMeasures">
            <a-textarea placeholder="请输入个体防护措施" v-model="form.personalProtectiveMeasures" :auto-size="{ minRows:2, maxRows: 5 }" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="应急措施" prop="emergencyMeasures">
            <a-textarea placeholder="请输入应急措施" v-model="form.emergencyMeasures" :auto-size="{ minRows:2, maxRows: 5 }" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="管控后等级l" prop="rectificationLevelL">
            <a-select
                model="default"
                placeholder="请选择管控后等级l"
                :allowClear="true"
                v-model="form.rectificationLevelL"
                @change="djChange('rectificationLevelL')"
            >
              <a-select-option value="0.1">0.1</a-select-option>
              <a-select-option value="0.2">0.2</a-select-option>
              <a-select-option value="0.5">0.5</a-select-option>
              <a-select-option value="1">1</a-select-option>
              <a-select-option value="3">3</a-select-option>
              <a-select-option value="6">6</a-select-option>
              <a-select-option value="10">10</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="管控后等级e" prop="rectificationLevelE">
            <a-select
                model="default"
                placeholder="请选择管控后等级e"
                :allowClear="true"
                v-model="form.rectificationLevelE"
                @change="djChange('rectificationLevelE')"
            >
              <a-select-option value="0.5">0.5</a-select-option>
              <a-select-option value="1">1</a-select-option>
              <a-select-option value="2">2</a-select-option>
              <a-select-option value="3">3</a-select-option>
              <a-select-option value="6">6</a-select-option>
              <a-select-option value="10">10</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="管控后等级c" prop="rectificationLevelC">
            <a-select
                model="default"
                placeholder="请选择管控后等级c"
                :allowClear="true"
                v-model="form.rectificationLevelC"
                @change="djChange('rectificationLevelC')"
            >
              <a-select-option value="1">1</a-select-option>
              <a-select-option value="3">3</a-select-option>
              <a-select-option value="7">7</a-select-option>
              <a-select-option value="15">15</a-select-option>
              <a-select-option value="40">40</a-select-option>
              <a-select-option value="100">100</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="管控后等级d" prop="rectificationLevelD">
            <a-input placeholder="请输入管控后等级d" v-model="form.rectificationLevelD" disabled />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="管控后等级" prop="rectificationLevel">
            <a-select
                model="default"
                placeholder="请选择管控后等级"
                :allowClear="true"
                v-model="form.rectificationLevel"
                disabled
            >
              <a-select-option value="重大">重大</a-select-option>
              <a-select-option value="较大">较大</a-select-option>
              <a-select-option value="一般">一般</a-select-option>
              <a-select-option value="低">低</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="管控责任人" prop="responsiblePerson">
            <a-input placeholder="请输入管控责任人" v-model="form.responsiblePerson" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="16" v-if="topTableOperateDialogFlag === 'specialEquipmentMaintain'">
        <a-col :span="12">
          <a-form-model-item label="注册编号" prop="zcbh">
            <a-input placeholder="请输入注册编号" v-model="form.zcbh" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="设备名称" prop="sbmc">
            <a-input placeholder="请输入设备名称" v-model="form.sbmc" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="规格型号" prop="ggxh">
            <a-input placeholder="请输入规格型号" v-model="form.ggxh" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="所属车间" prop="cjmc">
            <a-input placeholder="请输入所属车间" v-model="form.cjmc" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="安装地点" prop="azdd">
            <a-input placeholder="请输入安装地点" v-model="form.azdd" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="种类" prop="zl">
            <a-input placeholder="请输入种类" v-model="form.zl" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="类别" prop="lb">
            <a-input placeholder="请输入类别" v-model="form.lb" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="品种" prop="pz">
            <a-input placeholder="请输入品种" v-model="form.pz" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="设备代码" prop="sbdm">
            <a-input placeholder="请输入设备代码" v-model="form.sbdm" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="用途" prop="yt">
            <a-input placeholder="请输入用途" v-model="form.yt" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="使用状态" prop="syzt">
            <a-select
                model="default"
                placeholder="请选择使用状态"
                :allowClear="true"
                v-model="form.syzt"
            >
              <a-select-option value="在用">在用</a-select-option>
              <a-select-option value="维修">维修</a-select-option>
              <a-select-option value="停用">停用</a-select-option>
              <a-select-option value="报废">报废</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="技术参数" prop="jscs">
            <a-textarea placeholder="请输入技术参数" v-model="form.jscs" :auto-size="{ minRows:2, maxRows: 5 }" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="生产单位" prop="scdw">
            <a-input placeholder="请输入生产单位" v-model="form.scdw" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="出厂日期" prop="ccrq">
            <a-date-picker style="width: 100%;" placeholder="请选择出厂日期" v-model="form.ccrq" :valueFormat="'YYYY-MM-DD'" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="出厂编号" prop="ccbh">
            <a-input placeholder="请输入出厂编号" v-model="form.ccbh" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="安装时间" prop="azsj">
            <a-input placeholder="请输入安装时间" v-model="form.azsj" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="安装单位" prop="azdw">
            <a-input placeholder="请输入安装单位" v-model="form.azdw" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="投运日期" prop="tyrq">
            <a-date-picker style="width: 100%;" placeholder="请选择投运日期" v-model="form.tyrq" :valueFormat="'YYYY-MM-DD'" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="责任人" prop="zrr">
            <a-input placeholder="请输入责任人" v-model="form.zrr" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="检验周期" prop="jyzq">
            <a-input placeholder="请输入检验周期" v-model="form.jyzq" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="上次检验日期" prop="scjyrq">
            <a-date-picker style="width: 100%;" placeholder="请选择上次检验日期" v-model="form.scjyrq" :valueFormat="'YYYY-MM-DD'" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="下次检验日期" prop="xcjyrq">
            <a-date-picker style="width: 100%;" placeholder="请选择下次检验日期" v-model="form.xcjyrq" :valueFormat="'YYYY-MM-DD'" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="备注" prop="bz">
            <a-textarea placeholder="请输入备注" v-model="form.bz" :auto-size="{ minRows:2, maxRows: 5 }" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="16" v-if="topTableOperateDialogFlag === 'safeCheckMaintain'">
        <a-col :span="12">
          <a-form-model-item label="检查日期" prop="jcrq">
            <a-date-picker style="width: 100%;" placeholder="请选择检查日期" v-model="form.jcrq" :valueFormat="'YYYY-MM-DD'" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="检查类型" prop="jclx">
            <a-input placeholder="请输入检查类型" v-model="form.jclx" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="检查单位" prop="jcdw">
            <a-input placeholder="请输入检查单位" v-model="form.jcdw" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="检查人" prop="jcr">
            <a-input placeholder="请输入检查人" v-model="form.jcr" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="检查地点" prop="jcdd">
            <a-input placeholder="请输入检查地点" v-model="form.jcdd" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="被检查单位" prop="bjcdw">
            <a-input placeholder="请输入被检查单位" v-model="form.bjcdw" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="执行分厂" prop="zxfc">
            <a-select
                model="default"
                placeholder="请选择执行分厂"
                :allowClear="true"
                v-model="form.zxfc"
                @change="zrfcSelectChange"
            >
              <a-select-option v-for="item in zrfcSelectData" :key="item.id" :value="item.name">{{item.name}}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="执行车间" prop="zxcj">
            <a-select
                model="default"
                placeholder="请选择执行车间"
                :allowClear="true"
                v-model="form.zxcj"
            >
              <a-select-option v-for="item in zrcjSelectData" :key="item.id" :value="item.name">{{item.name}}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="检查内容" prop="jcnr">
            <a-textarea placeholder="请输入检查内容" v-model="form.jcnr" :auto-size="{ minRows:2, maxRows: 5 }" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="检查结果" prop="jcjg">
            <a-textarea placeholder="请输入检查结果" v-model="form.jcjg" :auto-size="{ minRows:2, maxRows: 5 }" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="16" v-if="topTableOperateDialogFlag === 'safeAccidentMaintain'">
        <a-col :span="12">
          <a-form-model-item label="事故日期" prop="f_sgrq">
            <a-date-picker style="width: 100%;" placeholder="请选择事故日期" v-model="form.f_sgrq" :valueFormat="'YYYY-MM-DD'" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="事故单位" prop="f_sgdw">
            <a-input placeholder="请输入事故单位" v-model="form.f_sgdw" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="事故经过" prop="f_sgjg">
            <a-textarea placeholder="请输入事故经过" v-model="form.f_sgjg" :auto-size="{ minRows:2, maxRows: 5 }" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="类型" prop="f_lx">
            <a-select
                model="default"
                placeholder="请输入类型"
                :allowClear="true"
                v-model="form.f_lx"
            >
              <a-select-option v-for="item in sglxSelectData" :key="item.id" :value="item.name">{{item.name}}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="性质" prop="f_xz">
            <a-select
                model="default"
                placeholder="请输入性质"
                :allowClear="true"
                v-model="form.f_xz"
            >
              <a-select-option v-for="item in sgxzSelectData" :key="item.id" :value="item.name">{{item.name}}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="死亡人数" prop="f_swrs">
            <a-input-number :min="1" :precision="0" placeholder="请输入死亡人数" v-model="form.f_swrs" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="重伤人数" prop="f_zsrs">
            <a-input-number :min="1" :precision="0" placeholder="请输入重伤人数" v-model="form.f_zsrs" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="轻伤人数" prop="f_qsrs">
            <a-input-number :min="1" :precision="0" placeholder="请输入轻伤人数" v-model="form.f_qsrs" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="直接损失（万元）" prop="f_zjss">
            <a-input placeholder="请输入直接损失（万元）" v-model="form.f_zjss" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="损失工作日" prop="f_ssgzr">
            <a-input placeholder="请输入损失工作日" v-model="form.f_ssgzr" />
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
    <ProjectUnitDialog ref="ProjectUnitDialog" :unitType="2" :unitSelectType="'single'" @unitSelectSuccess="unitSelectSuccess" />
    <ProjectUserDialog ref="ProjectUserDialog" :userSelectType="'single'" @userSelectSuccess="userSelectSuccess" />
    <ThreeViolationUsersDialog ref="ThreeViolationUsersDialog" @userSelectSuccess="threeViolationUsersSelectSuccess" />
    <IconSelectDialog ref="IconSelectDialog" @iconSelectSuccess="iconSelectSuccess" />
  </a-modal>
</template>

<script>
import ProjectUnitDialog from '@/components/ProjectComponents/ProjectUnitDialog'
import ProjectUserDialog from '@/components/ProjectComponents/ProjectUserDialog'
import ThreeViolationUsersDialog from '@/components/ProjectComponents/ThreeViolationUsersDialog'
import IconSelectDialog from '@/components/ProjectComponents/IconSelectDialog'
import { resumptionSetAdd, resumptionSetEdit, resumptionSubmitEdit } from '@/api/resumption'
import { riskPointSetAdd, riskPointSetEdit, riskPointCheckEdit } from '@/api/riskPoint'
import { majorInsceptionSetAdd, majorInsceptionSetEdit } from '@/api/majorInsception'
import { weeklyWriteEdit, weeklyCollectEdit } from '@/api/weekly'
import { outsourcedUnitSubmitAdd, outsourcedUnitSubmitEdit,outsourcedUnitProcessEdit,outsourcedUnitFileManageEdit } from '@/api/outsourcedUnit'
import { threeViolationSubmitAdd,threeViolationSubmitEdit,ViolationProcessWriteEdit,safeFeedbackEdit,checkFeedbackEdit,leaderTalkFeedbackEdit,familyFeedbackEdit,threeViolationNowUsers } from '@/api/threeViolation'
import { performanceManageAdd, performanceManageEdit } from '@/api/performance'
import { moduleAdd, moduleEdit, branchAdd, branchEdit, branchAdd1, branchEdit1, roleAdd, roleEdit, dictionariesAdd, dictionariesEdit, hiddenDangerAdd, hiddenDangerEdit, workshopSearch5 } from '@/api/basic'
import { riskCheckStandardAdd, riskCheckStandardEdit } from '@/api/riskCheck'
import { protectionFileAdd,protectionFileEdit } from '@/api/protectionFacility'
import { emergencyPlanAdd, emergencyPlanEdit } from '@/api/emergencyPlan'
import { safetyTrainingAdd, safetyTrainingEdit } from '@/api/safetyTraining'
import { specialEquipmentMaintainOperate } from '@/api/specialEquipment'
import { safeCheckMaintainOperate } from '@/api/safeCheck'
import { safeAccidentMaintainOperate } from '@/api/safeAccident'
export default {
  components: {
    ProjectUnitDialog,
    ProjectUserDialog,
    ThreeViolationUsersDialog,
    IconSelectDialog
  },
  props: {
    topTableOperateDialogFlag: {
      type: String,
      default: ''
    } // 标记
  },
  computed: {
    zrfcSelectData() {
      return JSON.parse(localStorage.getItem('unitInfo12'))[0].secondLevelArchivesList
    } // 分厂名称下拉框数据
  },
  data() {
    return {
      visible: false, // 弹窗显示
      title: '', // 弹窗标题
      type: '', // 弹窗类型
      okBtnLoading: false, // 确定按钮loading,
      form: {}, // 表单数据
      labelCol: { span: 5 }, // 表单label宽度
      wrapperCol: { span: 18 }, // 表单内容宽度
      nowIcon: 'setting', // 默认图标
      secondId: '', // 二级机构id
      cjmcSelectData: [], // 车间名称下拉框数据
      zwSelectData: [], // 职务名称下拉框数据
      cjSelectData: [], // 车间名称下拉框数据
      zrcjSelectData: [], // 责任车间名称下拉框数据
      zgqxSelectData: [
        { name: '1天内', value: 1 },
        { name: '3天内', value: 3 },
        { name: '5天内', value: 5 },
        { name: '7天内', value: 7 },
        { name: '10天内', value: 10 },
        { name: '15天内', value: 15 },
        { name: '30天内', value: 30 }
      ], // 整改期限下拉框数据
      zrbmSelectData: [], // 责任部门下拉框数据
      yhflSelectData: [], // 隐患分类下拉框数据
      yhfjSelectData: [], // 隐患分级下拉框数据
      dwlxSelectData: [], // 单位类型下拉框数据
      sglxSelectData: [], // 事故类型下拉框数据
      sgxzSelectData: [], // 事故性质下拉框数据
      yearSelectData: [], // 年份下拉框数据
      monthSelectData: [], // 月份下拉框数据
      rules: {
        thirdInstitutionsName: [{ required: true, message: '车间不能为空！' }],
        position: [{ required: true, message: '职务不能为空！' }],
        currentUnit: [{ required: true, message: '所在单位不能为空！' }],
        num: [{ required: true, message: '序号不能为空！' }],
        fillUnit:[{ required: true, message: '检查单位不能为空！' }],
        constructionUnit: [{ required: true, message: '施工单位不能为空！' }],
        unitStatus: [{ required: true, message: '单位状态不能为空！' }],
        personFullName:[{ required: true, message: '三违人员不能为空！' }],
        violationDate:[{ required: true, message: '三违日期不能为空！' }],
        reflectCheckSubmitter:[{ required: true, message: '反思检查提交人不能为空！' }],
        standardScore:[{ required: true, message: '标准分值不能为空！' }],
        number: [{ required: true, message: '序号不能为空！' }],
        inherentRankL: [{ required: true, message: '固有等级L不能为空！' }],
        inherentRankE: [{ required: true, message: '固有等级E不能为空！' }],
        inherentRankC: [{ required: true, message: '固有等级C不能为空！' }],
        inherentRankD: [{ required: true, message: '固有等级D不能为空！' }],
        inherentRank: [{ required: true, message: '固有等级不能为空！' }],
        rectificationLevelL: [{ required: true, message: '管控后等级L不能为空！' }],
        rectificationLevelE: [{ required: true, message: '管控后等级E不能为空！' }],
        rectificationLevelC: [{ required: true, message: '管控后等级C不能为空！' }],
        rectificationLevelD: [{ required: true, message: '管控后等级D不能为空！' }],
        rectificationLevel: [{ required: true, message: '管控后等级不能为空！' }],
        year: [{ required: true, message: '计划年份呢不能为空！' }],
        month: [{ required: true, message: '计划月份不能为空！' }],
        trainDate: [{ required: true, message: '培训日期不能为空！' }],
        jcrq:[{ required: true, message: '检查日期不能为空！' }],
        f_sgrq:[{ required: true, message: '事故日期不能为空！' }],
        qxflXh: [{ required: true, message: '序号不能为空！' }],
        submitBranch: [{ required: true, message: '提交分厂不能为空！' }],
        location: [{ required: true, message: '地点不能为空！', whitespace: true }],
        professionalType:[{ required: true, message: '专业类型不能为空！', whitespace: true }],
        outsourceUnitName: [{ required: true, message: '外委队名称不能为空！', whitespace: true }],
        projectName: [{ required: true, message: '工程名称不能为空！', whitespace: true }],
        illegal:[{ required: true, message: '违规行为不能为空！', whitespace: true }],
        safetyLessonStatus:[{ required: true, message: '安全补课情况不能为空！', whitespace: true }],
        reflectCheckStatus:[{ required: true, message: '反思检查情况不能为空！', whitespace: true }],
        monitorStatus:[{ required: true, message: '班长谈话不能为空！', whitespace: true }],
        workshopStatus:[{ required: true, message: '车间主任谈话不能为空！', whitespace: true }],
        unionStatus:[{ required: true, message: '工会主席谈话不能为空！', whitespace: true }],
        secretaryStatus:[{ required: true, message: '支部书记谈话不能为空！', whitespace: true }],
        leaderStatus:[{ required: true, message: '分管领导谈话不能为空！', whitespace: true }],
        familyManagementStatus:[{ required: true, message: '家属协管关不能为空！', whitespace: true }],
        primaryElement: [{ required: true, message: '一级要素不能为空！', whitespace: true }],
        secondaryElement: [{ required: true, message: '二级要素不能为空！', whitespace: true }],
        evaluationPoints: [{ required: true, message: '评价要点不能为空！', whitespace: true }],
        place: [{ required: true, message: '地点不能为空！', whitespace: true }],
        equipment: [{ required: true, message: '设备设施不能为空！', whitespace: true }],
        positionCheck: [{ required: true, message: '排查岗位不能为空！', whitespace: true }],
        riskSource: [{ required: true, message: '危险源不能为空！', whitespace: true }],
        facilityName: [{ required: true, message: '名称不能为空！', whitespace: true }],
        trainContent: [{ required: true, message: '培训内容不能为空！', whitespace: true }],
        zcbh:[{ required: true, message: '注册编号不能为空！', whitespace: true }],
        sbmc:[{ required: true, message: '设备名称不能为空！', whitespace: true }],
        jcdw:[{ required: true, message: '检查单位不能为空！', whitespace: true }],
        bjcdw:[{ required: true, message: '被检查单位不能为空！', whitespace: true }],
        jcnr:[{ required: true, message: '检查内容不能为空！', whitespace: true }],
        f_sgdw:[{ required: true, message: '事故单位不能为空！', whitespace: true }],
        f_sgjg:[{ required: true, message: '事故经过不能为空！', whitespace: true }],
        qxflMc: [{ required: true, message: '名称不能为空！', whitespace: true }],
        name: [{ required: true, message: '名称不能为空！', whitespace: true }]
      } // 表单验证规则
    }
  },
  mounted() {
    this.yearSelectData = []
    this.monthSelectData = []
    const nowYear = new Date().getFullYear()
    for (let i = nowYear - 2; i <= nowYear; i++) {
      this.yearSelectData.push({ name: i + '年', value: i })
    }
    for (let i = 1; i <= 12; i++) {
      this.monthSelectData.push({ name: i + '月', value: i })
    }
  },
  methods: {
    // 开关改变
    switchChange(checked, item) {
      this.form[item] = checked ? '是' : '否'
    },
    // 单位选择
    unitSelect() {
      this.$refs.ProjectUnitDialog.visible = true
    },
    // 单位选择成功
    unitSelectSuccess(units) {
      this.form.currentUnit = this.form.fillUnit = this.form.constructionUnit = units[0].split('/')[0].split('-')[1] + '/' + units[0].split('/')[1].split('-')[1]
    },
    // 用户选择
    userSelect (type) {
      this.$refs.ProjectUserDialog.visible = true
      this.$refs.ProjectUserDialog.type = type
    },
    // 用户选择成功
    userSelectSuccess(value, type) {
      this.form[type] = value.name + '(' + value.workNum + ')'
    },
    // 三违人员选择
    threeViolationUserSelect(type) {
      threeViolationNowUsers().then(res => {
        if (res) {
          this.$refs.ThreeViolationUsersDialog.visible = true
          this.$refs.ThreeViolationUsersDialog.type = type
          this.$refs.ThreeViolationUsersDialog.userSelectData = res
        }
      })
    },
    // 三违人员选择成功
    threeViolationUsersSelectSuccess(value, type) {
      this.form[type] = value
    },
    // 图标选择
    iconSelect() {
      this.$refs.IconSelectDialog.visible = true
    },
    // 图标选择成功
    iconSelectSuccess(icon) {
      this.form.qxflMktb = this.nowIcon = icon
    },
    // 分厂名称下拉框改变
    zrfcSelectChange(selectedItems) {
      this.zrcjSelectData = []
      const erSanData = JSON.parse(localStorage.getItem('unitInfo23'))
      erSanData.forEach(item => {
        if (item.name === selectedItems) this.zrcjSelectData = item.thirdLevelArchivesList
      })
    },
    // 车间下拉框改变
    cjSelectChange(selectedItems) {
      this.zwSelectData = []
      this.form.position = undefined
      let params = { id: '', pageNo: 1, pageSize: 999 }
      const erSanData = JSON.parse(localStorage.getItem('unitInfo23'))
      erSanData.forEach(item => {
        if (this.secondId === item.id) {
          item.thirdLevelArchivesList.forEach(itm => {
            if (itm.name === selectedItems) params.id = itm.id
          })
        }
      })
      workshopSearch5(params).then(res => {
        if (res) this.zwSelectData = res.records
      })
    },
    // 等级改变
    djChange(item) {
      this.form[item] && (this.form[item] = this.form[item] * 1)
      if (this.form.inherentRankL && this.form.inherentRankE && this.form.inherentRankC) {
        this.form.inherentRankD = this.form.inherentRankL * this.form.inherentRankE * this.form.inherentRankC
        this.form.inherentRank = (this.form.inherentRankD > 70 ? (this.form.inherentRankD > 160 ? (this.form.inherentRankD > 320 ? '重大' : '较大') : '一般') : '低')
      }
      if (this.form.rectificationLevelC && this.form.rectificationLevelC && this.form.rectificationLevelC) {
        this.form.rectificationLevelD = this.form.rectificationLevelL * this.form.rectificationLevelE * this.form.rectificationLevelC
        this.form.rectificationLevel = (this.form.rectificationLevelD > 70 ? (this.form.rectificationLevelD > 160 ? (this.form.rectificationLevelD > 320 ? '重大' : '较大') : '一般') : '低')
      }
    },
    // 确认
    isOk() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.okBtnLoading = true
          switch (this.topTableOperateDialogFlag) {
            case 'resumptionSet':
              if (this.type === 'projectTableAdd') {
                resumptionSetAdd(this.form).then(res => this.operateResult(res))
              } else if (this.type === 'projectTableEdit') {
                resumptionSetEdit(this.form).then(res => this.operateResult(res))
              }
              break
            case 'resumptionSubmit':
              if (this.type === 'projectTableEdit') {
                resumptionSubmitEdit(this.form).then(res => this.operateResult(res))
              }
              break
            case 'riskPointSet':
              if (this.type === 'projectTableAdd') {
                riskPointSetAdd(this.form).then(res => this.operateResult(res))
              } else if (this.type === 'projectTableEdit') {
                riskPointSetEdit(this.form).then(res => this.operateResult(res))
              }
              break
            case 'riskPointCheck':
              riskPointCheckEdit(this.form).then(res => this.operateResult(res))
              break
            case 'majorInsceptionSet':
              if (this.type === 'projectTableAdd') {
                majorInsceptionSetAdd(this.form).then(res => this.operateResult(res))
              } else if (this.type === 'projectTableEdit') {
                majorInsceptionSetEdit([ this.form ]).then(res => this.operateResult(res))
              }
              break
            case 'weeklyWrite':
              weeklyWriteEdit([this.form]).then(res => this.operateResult(res))
              break
            case 'weeklyCollect':
              weeklyCollectEdit([this.form]).then(res => this.operateResult(res))
              break
            case 'outsourcedUnitSubmit':
              if (this.type === 'projectTableAdd') {
                outsourcedUnitSubmitAdd(this.form).then(res => this.operateResult(res))
              } else if (this.type === 'projectTableEdit') {
                outsourcedUnitSubmitEdit(this.form).then(res => this.operateResult(res))
              }
              break
            case 'outsourcedUnitProcess':
              if (this.type === 'projectTableEdit') {
                outsourcedUnitProcessEdit([this.form]).then(res => this.operateResult(res))
              }
              break
            case 'outsourcedUnitFileManage':
              outsourcedUnitFileManageEdit([this.form]).then(res => this.operateResult(res))
              break
            case 'threeViolationSubmit':
              if (this.type === 'projectTableAdd') {
                threeViolationSubmitAdd(this.form).then(res => this.operateResult(res))
              } else if (this.type === 'projectTableEdit') {
                threeViolationSubmitEdit(this.form).then(res => this.operateResult(res))
              }
              break
            case 'ViolationProcessWrite':
              ViolationProcessWriteEdit([this.form]).then(res => this.operateResult(res))
              break
            case 'safeFeedback':
              safeFeedbackEdit([this.form]).then(res => this.operateResult(res))
              break
            case 'checkFeedback':
              checkFeedbackEdit([this.form]).then(res => this.operateResult(res))
              break
            case 'leaderTalkFeedback':
              leaderTalkFeedbackEdit([this.form]).then(res => this.operateResult(res))
              break
            case 'familyFeedback':
              familyFeedbackEdit([this.form]).then(res => this.operateResult(res))
              break
            case 'performanceManage':
              if (this.type === 'projectTableAdd') {
                performanceManageAdd(this.form).then(res => this.operateResult(res))
              } else if (this.type === 'projectTableEdit') {
                performanceManageEdit([this.form]).then(res => this.operateResult(res))
              }
              break
            case 'module':
              if (this.type === 'projectTableAdd') {
                moduleAdd(this.form).then(res => this.operateResult(res))
              } else if (this.type === 'projectTableEdit') {
                moduleEdit(this.form).then(res => this.operateResult(res))
              }
              break
            case 'branch':
              if (this.type === 'projectTableAdd') {
                this.form.firstArchivesId = JSON.parse(localStorage.getItem('unitInfo12'))[0].id
                branchAdd(this.form).then(res => this.operateResult(res))
              } else if (this.type === 'projectTableEdit') {
                branchEdit(this.form).then(res => this.operateResult(res))
              }
              break
            case 'workshop':
              if (this.type === 'projectTableAdd') {
                branchAdd1(this.form).then(res => this.operateResult(res))
              } else if (this.type === 'projectTableEdit') {
                branchEdit1(this.form).then(res => this.operateResult(res))
              }
              break
            case 'role':
              if (this.type === 'projectTableAdd') {
                roleAdd(this.form).then(res => this.operateResult(res))
              } else if (this.type === 'projectTableEdit') {
                roleEdit([this.form]).then(res => this.operateResult(res))
              }
              break
            case 'dictionaries':
              if (this.type === 'projectTableAdd') {
                dictionariesAdd(this.form).then(res => this.operateResult(res))
              } else if (this.type === 'projectTableEdit') {
                dictionariesEdit(this.form).then(res => this.operateResult(res))
              }
              break
            case 'hiddenDanger':
              if (this.type === 'projectTableAdd') {
                hiddenDangerAdd(this.form).then(res => this.operateResult(res))
              } else if (this.type === 'projectTableEdit') {
                hiddenDangerEdit(this.form).then(res => this.operateResult(res))
              }
              break
            case 'riskCheckStandard':
              if (this.type === 'projectTableAdd') {
                riskCheckStandardAdd(this.form).then(res => this.operateResult(res))
              } else if (this.type === 'projectTableEdit') {
                riskCheckStandardEdit(this.form).then(res => this.operateResult(res))
              }
              break
            case 'protectionFile':
              if (this.type === 'projectTableAdd') {
                protectionFileAdd(this.form).then(res => this.operateResult(res))
              } else if (this.type === 'projectTableEdit') {
                protectionFileEdit(this.form).then(res => this.operateResult(res))
              }
              break
            case 'maintainEmergencyPlan':
              if (this.type === 'projectTableAdd') {
                emergencyPlanAdd(this.form).then(res => this.operateResult(res))
              } else if (this.type === 'projectTableEdit') {
                emergencyPlanEdit(this.form).then(res => this.operateResult(res))
              }
              break
            case 'safetyTrainingRecord':
              if (this.type === 'projectTableAdd') {
                safetyTrainingAdd(this.form).then(res => this.operateResult(res))
              } else if (this.type === 'projectTableEdit') {
                safetyTrainingEdit(this.form).then(res => this.operateResult(res))
              }
              break
            case 'specialEquipmentMaintain':
              specialEquipmentMaintainOperate(this.form).then(res => this.operateResult(res))
              break
            case 'safeCheckMaintain':
              safeCheckMaintainOperate(this.form).then(res => this.operateResult(res))
              break
            case 'safeAccidentMaintain':
              safeAccidentMaintainOperate(this.form).then(res => this.operateResult(res))
              break
          }
        }
      })
    },
    // 操作结果
    operateResult(res) {
      this.okBtnLoading = false
      if (typeof res === 'string' && res.indexOf('成功') !== -1) {
        this.$message.success(res)
        this.$emit('operateSuccess')
        this.visible = false
        this.dialogClose()
      } else {
        this.$message.info(res.message)
      }
    },
    // 弹窗关闭
    dialogClose() {
      this.okBtnLoading = false
      this.form = {}
    }
  }
}
</script>

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
      <template v-if="nowTabInfo.isSpecial">
        <template v-if="bottomTableOperateDialogFlag === 'riskPointSet' && nowTabInfo.param === 'cycleSet'">
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-model-item label="检查单位" prop="checkCompanyName">
                <div style="display: flex;align-items: center;height: 40px;">
                  <a-input disabled placeholder="请选择检查单位" v-model="form.checkCompanyName" style="border-right: 0;border-radius: 2px 0 0 2px;" />
                  <a-button style="border-right: 0;border-radius: 0 2px 2px 0;" type="primary" @click="unitSelect"><a-icon type="search" /></a-button>
                </div>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="检查岗位" prop="checkWorkName">
                <a-select
                    model="default"
                    placeholder="请选择检查岗位"
                    :allowClear="true"
                    v-model="form.checkWorkName"
                >
                  <a-select-option v-for="item in jcgwSelectData" :key="item.id" :value="item.name">{{ item.name }}</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="检查周期" prop="checkCycle">
                <a-select
                    model="default"
                    placeholder="请选择检查周期"
                    :allowClear="true"
                    v-model="form.checkCycle"
                >
                  <a-select-option value="月">月</a-select-option>
                  <a-select-option value="周">周</a-select-option>
                  <a-select-option value="日">日</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="周期数量" prop="cycleNumber">
                <a-select
                    model="default"
                    placeholder="请选择周期数量"
                    :allowClear="true"
                    v-model="form.cycleNumber"
                >
                  <a-select-option value="1">1</a-select-option>
                  <a-select-option value="0">0</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="下次检查日期" prop="nextCheckTime">
                <a-date-picker style="width: 100%;" v-model="form.nextCheckTime" :valueFormat="'YYYY-MM-DD'" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="每月执行日1" prop="day1">
                <a-select
                    model="default"
                    placeholder="请选择每月执行日1"
                    :allowClear="true"
                    v-model="form.day1"
                >
                  <a-select-option v-for="item in 28" :key="item" :value="item">{{ item }}</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="每月执行日2" prop="day2">
                <a-select
                    model="default"
                    placeholder="请选择每月执行日2"
                    :allowClear="true"
                    v-model="form.day2"
                >
                  <a-select-option v-for="item in 28" :key="item" :value="item">{{ item }}</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="周一执行" prop="monday">
                <a-switch checked-children="是" un-checked-children="否" :default-checked="form.monday === '1'" @change="switchChange($event, 'monday')" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="周二执行" prop="tuesday">
                <a-switch checked-children="是" un-checked-children="否" :default-checked="form.tuesday === '1'" @change="switchChange($event, 'tuesday')" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="周三执行" prop="wednesday">
                <a-switch checked-children="是" un-checked-children="否" :default-checked="form.wednesday === '1'" @change="switchChange($event, 'wednesday')" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="周四执行" prop="thursday">
                <a-switch checked-children="是" un-checked-children="否" :default-checked="form.thursday === '1'" @change="switchChange($event, 'thursday')" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="周五执行" prop="friday">
                <a-switch checked-children="是" un-checked-children="否" :default-checked="form.friday === '1'" @change="switchChange($event, 'friday')" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="周六执行" prop="saturday">
                <a-switch checked-children="是" un-checked-children="否" :default-checked="form.saturday === '1'" @change="switchChange($event, 'saturday')" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="周日执行" prop="sunday">
                <a-switch checked-children="是" un-checked-children="否" :default-checked="form.sunday === '1'" @change="switchChange($event, 'sunday')" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </template>
        <template v-if="bottomTableOperateDialogFlag === 'riskPointCheck'">
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-model-item label="检查情况" prop="checkCondition">
                <a-select
                    model="default"
                    placeholder="请选择检查情况"
                    :allowClear="true"
                    v-model="form.checkCondition"
                >
                  <a-select-option value="正常">正常</a-select-option>
                  <a-select-option value="异常">异常</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="问题描述" prop="questionDescription">
                <a-textarea placeholder="请输入问题描述" v-model="form.questionDescription" :auto-size="{ minRows:2, maxRows: 5 }" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </template>
        <template v-if="bottomTableOperateDialogFlag === 'outsourcedUnitFileManage'">
          <a-row :gutter="16">
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
              <a-form-model-item label="实际开始日期" prop="startDate">
                <a-date-picker style="width: 100%;" placeholder="请输入开始日期" v-model="form.startDate" :valueFormat="'YYYY-MM-DD'" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="实际结束日期" prop="stopDate">
                <a-date-picker style="width: 100%;" placeholder="请输入结束日期" v-model="form.stopDate" :valueFormat="'YYYY-MM-DD'" />
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="进度描述" prop="constructionStatus">
                <a-textarea placeholder="请输入进度描述" v-model="form.constructionStatus" :auto-size="{ minRows:2, maxRows: 5 }" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </template>
        <template v-if="bottomTableOperateDialogFlag === 'outsourcedUnitAssess'">
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-model-item label="评估分数" prop="evaluationScore">
                <a-input-number :min="1" :precision="0" placeholder="请输入评估分数" v-model="form.evaluationScore" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="事故清退类型" prop="accidentType">
                <a-select
                    model="default"
                    placeholder="请选择事故清退类型"
                    :allowClear="true"
                    v-model="form.accidentType"
                >
                  <a-select-option v-for="item in sgqtlxSelectData" :key="item.id" :value="item.name">{{ item.name }}</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="评估意见" prop="evaluationOpinion">
                <a-textarea placeholder="请输入评估意见" v-model="form.evaluationOpinion" :auto-size="{ minRows:2, maxRows: 5 }" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </template>
        <template v-if="bottomTableOperateDialogFlag === 'branch'">
          <a-row :gutter="16">
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
        </template>
        <template v-if="bottomTableOperateDialogFlag === 'workshop' && nowTabInfo.param === 'userProfile'">
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-model-item label="工号" prop="workNum">
                <a-input-number :min="1" :precision="0" placeholder="请输入工号" v-model="form.workNum" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="名称" prop="name">
                <a-input placeholder="请输入名称" v-model="form.name" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="性别" prop="gender">
                <a-select
                    model="default"
                    placeholder="请选择性别"
                    :allowClear="true"
                    v-model="form.gender"
                >
                  <a-select-option value="男">男</a-select-option>
                  <a-select-option value="女">女</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="身份证号" prop="idNumber">
                <a-input placeholder="请输入身份证号" v-model="form.idNumber" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="职务" prop="position">
                <a-select
                    model="default"
                    placeholder="请选择职务"
                    :allowClear="true"
                    v-model="form.position"
                >
                  <a-select-option v-for="item in zwSelectData" :key="item.id" :value="item.name">{{ item.name }}</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="岗位工种" prop="jobs">
                <a-select
                    model="default"
                    placeholder="请选择岗位工种"
                    :allowClear="true"
                    v-model="form.jobs"
                >
                  <a-select-option v-for="item in gwgzSelectData" :key="item.id" :value="item.name">{{ item.name }}</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="查询范围" prop="operatingRange">
                <a-select
                    model="default"
                    placeholder="请选择查询范围"
                    :allowClear="true"
                    v-model="form.operatingRange"
                >
                  <a-select-option value="车间级">车间级</a-select-option>
                  <a-select-option value="分厂级">分厂级</a-select-option>
                  <a-select-option value="公司级">公司级</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="所在班组" prop="teamName">
                <a-select
                    model="default"
                    placeholder="请选择所在班组"
                    :allowClear="true"
                    v-model="form.teamName"
                >
                  <a-select-option v-for="item in szbzSelectData" :key="item.id" :value="item.name">{{ item.name }}</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="整改人级别" prop="correctorLevel">
                <a-select
                    model="default"
                    placeholder="请选择整改人级别"
                    :allowClear="true"
                    v-model="form.correctorLevel"
                >
                  <a-select-option v-for="item in ryjbSelectData" :key="item.id" :value="item.name">{{ item.name }}</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="复查人级别" prop="reviewerLevel">
                <a-select
                    model="default"
                    placeholder="请选择复查人级别"
                    :allowClear="true"
                    v-model="form.reviewerLevel"
                >
                  <a-select-option v-for="item in ryjbSelectData" :key="item.id" :value="item.name">{{ item.name }}</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="责任人级别" prop="responsibleLevel">
                <a-select
                    model="default"
                    placeholder="请选择责任人级别"
                    :allowClear="true"
                    v-model="form.responsibleLevel"
                >
                  <a-select-option v-for="item in ryjbSelectData" :key="item.id" :value="item.name">{{ item.name }}</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="风险排查级别" prop="riskLevel">
                <a-select
                    model="default"
                    placeholder="请选择风险排查级别"
                    :allowClear="true"
                    v-model="form.riskLevel"
                >
                  <a-select-option v-for="item in pcjbSelectData" :key="item.id" :value="item.name">{{ item.name }}</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="排查是否拍照" prop="checkWhetherPhoto">
                <a-select
                    model="default"
                    placeholder="请选择排查是否拍照"
                    :allowClear="true"
                    v-model="form.checkWhetherPhoto"
                >
                  <a-select-option value="是">是</a-select-option>
                  <a-select-option value="否">否</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="参加工作时间" prop="workTime">
                <a-date-picker style="width: 100%;" placeholder="请选择参加工作时间" v-model="form.workTime" :valueFormat="'YYYY-MM-DD'" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="接触职业危害时间" prop="hazardTime">
                <a-date-picker style="width: 100%;" placeholder="请选择接触职业危害时间" v-model="form.hazardTime" :valueFormat="'YYYY-MM-DD'" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="危害因素" prop="hazardousFactors">
                <a-input placeholder="请输入危害因素" v-model="form.hazardousFactors" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="是否管理员" prop="isAdmin">
                <a-select
                    model="default"
                    placeholder="请选择是否管理员"
                    :allowClear="true"
                    v-model="form.isAdmin"
                >
                  <a-select-option value="是">是</a-select-option>
                  <a-select-option value="否">否</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="外委单位检查人" prop="outsourcedUnitInspection">
                <a-select
                    model="default"
                    placeholder="请选择是否外委单位检查人"
                    :allowClear="true"
                    v-model="form.outsourcedUnitInspection"
                >
                  <a-select-option value="是">是</a-select-option>
                  <a-select-option value="否">否</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="三违处理人" prop="threeViolationHandler">
                <a-select
                    model="default"
                    placeholder="请选择是否三违处理人"
                    :allowClear="true"
                    v-model="form.threeViolationHandler"
                >
                  <a-select-option value="是">是</a-select-option>
                  <a-select-option value="否">否</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="反思检查提交人" prop="reflectionSubmitter">
                <a-select
                    model="default"
                    placeholder="请选择是否反思检查提交人"
                    :allowClear="true"
                    v-model="form.reflectionSubmitter"
                >
                  <a-select-option value="是">是</a-select-option>
                  <a-select-option value="否">否</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="班长谈话人" prop="monitor">
                <a-select
                    model="default"
                    placeholder="请选择是否班长谈话人"
                    :allowClear="true"
                    v-model="form.monitor"
                >
                  <a-select-option value="是">是</a-select-option>
                  <a-select-option value="否">否</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="车间主任谈话人" prop="workshopTalker">
                <a-select
                    model="default"
                    placeholder="请选择是否车间主任谈话人"
                    :allowClear="true"
                    v-model="form.workshopTalker"
                >
                  <a-select-option value="是">是</a-select-option>
                  <a-select-option value="否">否</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="工会主席谈话人" prop="unionTalker">
                <a-select
                    model="default"
                    placeholder="请选择是否工会主席谈话人"
                    :allowClear="true"
                    v-model="form.unionTalker"
                >
                  <a-select-option value="是">是</a-select-option>
                  <a-select-option value="否">否</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="支部书记谈话人" prop="branchTalker">
                <a-select
                    model="default"
                    placeholder="请选择是否支部书记谈话人"
                    :allowClear="true"
                    v-model="form.branchTalker"
                >
                  <a-select-option value="是">是</a-select-option>
                  <a-select-option value="否">否</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="分管领导谈话人" prop="chargeTalker">
                <a-select
                    model="default"
                    placeholder="请选择是否分管领导谈话人"
                    :allowClear="true"
                    v-model="form.chargeTalker"
                >
                  <a-select-option value="是">是</a-select-option>
                  <a-select-option value="否">否</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="非常规作业管理人" prop="unconventionalManager">
                <a-select
                    model="default"
                    placeholder="请选择是否非常规作业管理人"
                    :allowClear="true"
                    v-model="form.unconventionalManager"
                >
                  <a-select-option value="是">是</a-select-option>
                  <a-select-option value="否">否</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
          </a-row>
        </template>
        <template v-if="bottomTableOperateDialogFlag === 'riskCheckStandard'">
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-model-item label="序号" prop="number">
                <a-input-number :min="1" :precision="0" disabled v-model="form.number" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="级别" prop="level">
                <a-input disabled v-model="form.level" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="周期" prop="cycle">
                <a-select
                    model="default"
                    placeholder="请选择周期"
                    :allowClear="true"
                    v-model="form.cycle"
                >
                  <a-select-option value="班">班</a-select-option>
                  <a-select-option value="天">天</a-select-option>
                  <a-select-option value="周">周</a-select-option>
                  <a-select-option value="月">月</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="是否执行">
                <a-switch checked-children="是" un-checked-children="否" :default-checked="form.execute === '1'" @change="switchChange($event, 'execute')" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="周一">
                <a-switch checked-children="是" un-checked-children="否" :default-checked="form.monday === '1'" @change="switchChange($event, 'monday')" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="周二">
                <a-switch checked-children="是" un-checked-children="否" :default-checked="form.tuesday === '1'" @change="switchChange($event, 'tuesday')" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="周三">
                <a-switch checked-children="是" un-checked-children="否" :default-checked="form.wednesday === '1'" @change="switchChange($event, 'wednesday')" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="周四">
                <a-switch checked-children="是" un-checked-children="否" :default-checked="form.thursday === '1'" @change="switchChange($event, 'thursday')" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="周五">
                <a-switch checked-children="是" un-checked-children="否" :default-checked="form.friday === '1'" @change="switchChange($event, 'friday')" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="周六">
                <a-switch checked-children="是" un-checked-children="否" :default-checked="form.saturday === '1'" @change="switchChange($event, 'saturday')" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="周日">
                <a-switch checked-children="是" un-checked-children="否" :default-checked="form.sunday === '1'" @change="switchChange($event, 'sunday')" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="早班">
                <a-switch checked-children="是" un-checked-children="否" :default-checked="form.morning === '1'" @change="switchChange($event, 'morning')" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="中班">
                <a-switch checked-children="是" un-checked-children="否" :default-checked="form.noon === '1'" @change="switchChange($event, 'noon')" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="夜班">
                <a-switch checked-children="是" un-checked-children="否" :default-checked="form.night === '1'" @change="switchChange($event, 'night')" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="白班">
                <a-switch checked-children="是" un-checked-children="否" :default-checked="form.twoMorning === '1'" @change="switchChange($event, 'twoMorning')" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="晚班">
                <a-switch checked-children="是" un-checked-children="否" :default-checked="form.twoNight === '1'" @change="switchChange($event, 'twoNight')" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="正常班">
                <a-switch checked-children="是" un-checked-children="否" :default-checked="form.longMorning === '1'" @change="switchChange($event, 'longMorning')" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="月日期1" prop="monthDate1">
                <a-select
                    model="default"
                    placeholder="请选择月日期1"
                    :allowClear="true"
                    v-model="form.monthDate1"
                >
                  <a-select-option v-for="item in yrqSelectData" :key="item.id" :value="item.name">{{ item.name }}</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="月日期2" prop="monthDate2">
                <a-select
                    model="default"
                    placeholder="请选择月日期2"
                    :allowClear="true"
                    v-model="form.monthDate2"
                >
                  <a-select-option v-for="item in yrqSelectData" :key="item.id" :value="item.name">{{ item.name }}</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="月日期3" prop="monthDate3">
                <a-select
                    model="default"
                    placeholder="请选择月日期3"
                    :allowClear="true"
                    v-model="form.monthDate3"
                >
                  <a-select-option v-for="item in yrqSelectData" :key="item.id" :value="item.name">{{ item.name }}</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="下次检查日期" prop="nextCheckDate">
                <a-date-picker style="width: 100%;" placeholder="请选择下次检查日期" v-model="form.nextCheckDate" :valueFormat="'YYYY-MM-DD'" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </template>
        <template v-if="bottomTableOperateDialogFlag === 'protectionFile' && nowTabInfo.param === 'facilityInspectionPost'">
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-model-item label="分厂名称" prop="branch">
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
              <a-form-model-item label="岗位名称" prop="postName">
                <a-select
                    model="default"
                    placeholder="请选择岗位名称"
                    :allowClear="true"
                    v-model="form.postName"
                >
                  <a-select-option v-for="item in postNameSelectData" :key="item.id" :value="item.name">{{item.name}}</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="检查周期" prop="checkCycle">
                <a-select
                    model="default"
                    placeholder="请选择检查周期"
                    :allowClear="true"
                    v-model="form.checkCycle"
                >
                  <a-select-option value="天">天</a-select-option>
                  <a-select-option value="周">周</a-select-option>
                  <a-select-option value="月">月</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="下次检查日期" prop="nextCheckDate">
                <a-date-picker style="width: 100%;" placeholder="请输入下次检查日期" v-model="form.nextCheckDate" :valueFormat="'YYYY-MM-DD'" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </template>
        <template v-if="bottomTableOperateDialogFlag === 'specialEquipmentMaintain'">
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-model-item label="检定日期" prop="jdrq">
                <a-date-picker style="width: 100%;" placeholder="请输入检定日期" v-model="form.jdrq" :valueFormat="'YYYY-MM-DD'" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="检定单位" prop="jddw">
                <a-input placeholder="请输入检定单位"  v-model="form.jddw" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="检定结果" prop="jdjg">
                <a-select
                    model="default"
                    placeholder="请选择检定结果"
                    :allowClear="true"
                    v-model="form.jdjg"
                >
                  <a-select-option value="合格">合格</a-select-option>
                  <a-select-option value="不合格">不合格</a-select-option>
                  <a-select-option value="待复检">待复检</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="下次检验日期" prop="xcjyrq">
                <a-date-picker style="width: 100%;" placeholder="请输入下次检验日期" v-model="form.xcjyrq" :valueFormat="'YYYY-MM-DD'" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="检验前自检结论" prop="jyqzjjl">
                <a-input placeholder="请输入检验前自检结论"  v-model="form.jyqzjjl" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="实际检验情况" prop="sjjyqk">
                <a-input placeholder="请输入实际检验情况"  v-model="form.sjjyqk" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="检验整改情况" prop="jyzgqk">
                <a-input placeholder="请输入检验整改情况"  v-model="form.jyzgqk" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="检验机构检验结论" prop="jgjyjl">
                <a-input placeholder="请输入检验机构检验结论"  v-model="form.jgjyjl" />
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="备注" prop="bz">
                <a-textarea placeholder="请输入备注" v-model="form.bz" :auto-size="{ minRows:2, maxRows: 5 }" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </template>
        <template v-if="bottomTableOperateDialogFlag === 'healthMaintain'">
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-model-item label="证书类型" prop="zslx">
                <a-select
                    model="default"
                    placeholder="请选择证书类型"
                    :allowClear="true"
                    v-model="form.zslx"
                >
                  <a-select-option v-for="item in zslxSelectData" :key="item.id" :value="item.name">{{ item.name }}</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="证书编号" prop="zsbh">
                <a-input placeholder="请输入证书编号"  v-model="form.zsbh" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="有效期" prop="yxq">
                <a-input placeholder="请输入有效期"  v-model="form.yxq" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="发证日期" prop="fzrq">
                <a-date-picker style="width: 100%;" placeholder="请输入发证日期" v-model="form.fzrq" :valueFormat="'YYYY-MM-DD'" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="复审日期1" prop="fsrq1">
                <a-date-picker style="width: 100%;" placeholder="请输入复审日期1" v-model="form.fsrq1" :valueFormat="'YYYY-MM-DD'" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="实际复审日期1" prop="sjfsrq1">
                <a-date-picker style="width: 100%;" placeholder="请输入实际复审日期1" v-model="form.sjfsrq1" :valueFormat="'YYYY-MM-DD'" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="复审日期2" prop="fsrq2">
                <a-date-picker style="width: 100%;" placeholder="请输入复审日期2" v-model="form.fsrq2" :valueFormat="'YYYY-MM-DD'" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="实际复审日期2" prop="sjfsrq2">
                <a-date-picker style="width: 100%;" placeholder="请输入实际复审日期2" v-model="form.sjfsrq2" :valueFormat="'YYYY-MM-DD'" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="截止日期" prop="jzrq">
                <a-date-picker style="width: 100%;" placeholder="请输入截止日期" v-model="form.jzrq" :valueFormat="'YYYY-MM-DD'" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="发证单位" prop="fzdw">
                <a-input placeholder="请输入发证单位"  v-model="form.fzdw" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="作业类别" prop="zylb">
                <a-input placeholder="请输入作业类别"  v-model="form.zylb" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="适用范围" prop="syfw">
                <a-input placeholder="请输入适用范围"  v-model="form.syfw" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="是否超期" prop="sfcq">
                <a-select
                    model="default"
                    placeholder="请选择是否超期"
                    :allowClear="true"
                    v-model="form.sfcq"
                >
                  <a-select-option value="是">是</a-select-option>
                  <a-select-option value="否">否</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
          </a-row>
        </template>
      </template>
      <a-row v-else :gutter="16">
        <template v-for="item in nowColumns">
          <a-col v-if="!item.noShow" :key="item.dataIndex" :span="item.isTextarea ? 24 : 12">
            <a-form-model-item :label="item.title" :prop="item.dataIndex">
              <template v-if="item.isPercentage">
                <a-input-number :min="0" :max="1" :precision="2" :placeholder="`请输入${item.title}`" v-model="form[item.dataIndex]" :disabled="item.disabled" />
              </template>
              <template v-if="item.isNumberInput">
                <a-input-number :min="1" :precision="0" :placeholder="`请输入${item.title}`" v-model="form[item.dataIndex]" :disabled="item.disabled" />
              </template>
              <template v-if="item.isInput">
                <a-input :placeholder="`请输入${item.title}`" v-model="form[item.dataIndex]" :disabled="item.disabled" />
              </template>
              <template v-if="item.isTextarea">
                <a-textarea :placeholder="`请输入${item.title}`" v-model="form[item.dataIndex]" :auto-size="{ minRows: 2, maxRows: 5 }" :disabled="item.disabled" />
              </template>
              <template v-if="item.isDatePicker">
                <a-date-picker style="width: 100%;" :placeholder="`请输入${item.title}`" v-model="form[item.dataIndex]" :valueFormat="'YYYY-MM-DD'" :disabled="item.disabled" />
              </template>
              <template v-if="item.isTimePicker">
                <a-time-picker style="width: 100%;" :placeholder="`请输入${item.title}`" v-model="form[item.dataIndex]" :valueFormat="'HH:mm:ss'" :disabled="item.disabled" />
              </template>
            </a-form-model-item>
          </a-col>
        </template>
      </a-row>
    </a-form-model>
    <ProjectUnitDialog ref="ProjectUnitDialog" :unitType="3" :unitSelectType="'single'" @unitSelectSuccess="unitSelectSuccess" />
  </a-modal>
</template>

<script>
import bottomTableColumns from '@/components/ProjectComponents/BottomTableColumns'
import ProjectUnitDialog from '@/components/ProjectComponents/ProjectUnitDialog'
import { getUnit3Jobs } from '@/api/api'
import { resumptionSetAdd1, resumptionSetEdit1 } from '@/api/resumption'
import { riskPointSetAdd1, riskPointSetAdd2, riskPointSetEdit2, riskPointCheckEdit1 } from '@/api/riskPoint'
import { majorInsceptionAdd1, majorInsceptionSetEdit1, majorInsceptionSubmitEdit } from '@/api/majorInsception'
import { weeklyWriteEditAll } from '@/api/weekly'
import { outsourcedUnitProcessChildEdit,outsourcedUnitFileManageChildEdit, outsourcedUnitAssessAdd1, outsourcedUnitAssessEdit1, outsourcedUnitProcessAdd1, outsourcedUnitProcessAdd2, outsourcedUnitProcessAdd3, outsourcedUnitProcessAdd4 } from '@/api/outsourcedUnit'
import { performanceMaintainEdit1 } from '@/api/performance'
import {
  moduleAdd1,
  moduleEdit1,
  branchAdd1,
  branchEdit1,
  workshopAdd1,
  workshopEdit1,
  workshopAdd2,
  workshopEdit2,
  workshopAdd4,
  workshopEdit4,
  workshopAdd5,
  workshopEdit5,
  dictionariesAdd1,
  dictionariesEdit1,
  hiddenDangerAdd1,
  hiddenDangerEdit1
} from '@/api/basic'
import { protectionFileAdd1,protectionFileEdit1,protectionFileAdd2,protectionFileEdit2 } from '@/api/protectionFacility'
import { executeSituationAdd1, executeSituationEdit1 } from '@/api/emergencyPlan'
import { riskCheckStandardEdit1 } from '@/api/riskCheck'
import { specialEquipmentMaintainOperate1 } from '@/api/specialEquipment'
import { healthMaintainOperate1, healthMaintainOperate2 } from '@/api/health'
export default {
  components: {
    ProjectUnitDialog
  },
  props: {
    nowTabInfo: {
      type: Object,
      default: () => {}
    }, // 当前tab信息
    bottomTableOperateDialogFlag: {
      type: String,
      default: ''
    } // 标记
  },
  computed: {
    nowColumns () {
      return bottomTableColumns[this.nowTabInfo.param]
    },
    fcSelectData() {
      return JSON.parse(localStorage.getItem('unitInfo12'))[0].secondLevelArchivesList
    } // 分厂名称下拉框数据
  },
  data() {
    return {
      visible: false, // 弹窗显示
      title: '', // 弹窗标题
      type: '', // 弹窗类型
      okBtnLoading: false, // 确定按钮loading
      form: {}, // 表单数据
      labelCol: { span: 5 }, // 表单label宽度
      wrapperCol: { span: 18 }, // 表单内容宽度
      cjSelectData: [], // 车间名称下拉框数据
      postNameSelectData: [], //岗位名称下拉框数据
      jcgwSelectData: [], // 检查岗位下拉框数据
      sgqtlxSelectData: [], // 事故清退类型下拉框数据
      zwSelectData: [], // 职务下拉框数据
      gwgzSelectData: [], // 岗位工种下拉框数据
      szbzSelectData: [], // 所在班组下拉框数据
      zslxSelectData: [], // 证书类型下拉框数据
      ryjbSelectData: [], // 人员级别下拉框数据
      pcjbSelectData: [], // 排查级别下拉框数据
      yrqSelectData: [
        { id: 1, name: '1' },
        { id: 2, name: '2' },
        { id: 3, name: '3' },
        { id: 4, name: '4' },
        { id: 5, name: '5' },
        { id: 6, name: '6' },
        { id: 7, name: '7' },
        { id: 8, name: '8' },
        { id: 9, name: '9' },
        { id: 10, name: '10' },
        { id: 11, name: '11' },
        { id: 12, name: '12' },
        { id: 13, name: '13' },
        { id: 14, name: '14' },
        { id: 15, name: '15' },
        { id: 16, name: '16' },
        { id: 17, name: '17' },
        { id: 18, name: '18' },
        { id: 19, name: '19' },
        { id: 20, name: '20' },
        { id: 21, name: '21' },
        { id: 22, name: '22' },
        { id: 23, name: '23' },
        { id: 24, name: '24' },
        { id: 25, name: '25' },
        { id: 26, name: '26' },
        { id: 27, name: '27' },
        { id: 28, name: '28' }
      ], // 月日期下拉框数据
      rules: {
        keyTest: [{ required: true, message: '考核要素不能为空！', whitespace: true }],
        num: [{ required: true, message: '序号不能为空！' }],
        number: [{ required: true, message: '序号不能为空！' }],
        checkCompanyName: [{ required: true, message: '检查单位不能为空！' }],
        checkWorkName: [{ required: true, message: '检查岗位不能为空！' }],
        checkCycle: [{ required: true, message: '检查周期不能为空！' }],
        cycleNumber: [{ required: true, message: '周期数量不能为空！' }],
        nextCheckTime: [{ required: true, message: '下次检查日期不能为空！' }],
        checkCondition: [{ required: true, message: '检查情况不能为空！' }],
        startDate:[{ required: true, message: '开始日期不能为空！' }],
        inspectionDate:[{ required: true, message: '巡检日期不能为空！' }],
        checkDate:[{ required: true, message: '检查日期不能为空！' }],
        fillDate:[{ required: true, message: '填报日期不能为空！' }],
        score: [{ required: true, message: '评分不能为空！' }],
        branch: [{ required: true, message: '分厂名称不能为空！' }],
        workshop: [{ required: true, message: '车间名称不能为空！' }],
        postName: [{ required: true, message: '岗位名称不能为空！' }],
        planDate: [{ required: true, message: '计划日期不能为空！' }],
        jdrq: [{ required: true, message: '检定日期不能为空！' }],
        tjrq: [{ required: true, message: '体检日期不能为空！' }],
        zslx: [{ required: true, message: '证书类型不能为空！' }],
        workNum: [{ required: true, message: '工号不能为空！' }],
        mainEvaluation: [{ required: true, message: '评价要点不能为空！', whitespace: true }],
        liabilityStandardsFrequency: [{ required: true, message: '责任标准/频次不能为空！', whitespace: true }],
        evaluationRules: [{ required: true, message: '评价细则不能为空！', whitespace: true }],
        checkProject: [{ required: true, message: '检查项目不能为空！', whitespace: true }],
        checkStandard: [{ required: true, message: '检查标准不能为空！', whitespace: true }],
        checkContent: [{ required: true, message: '检查内容不能为空！', whitespace: true }],
        checkLocation:[{ required: true, message: '检查地点不能为空！', whitespace: true }],
        checkStatus:[{ required: true, message: '检查情况不能为空！', whitespace: true }],
        element:[{ required: true, message: '要素不能为空！', whitespace: true }],
        projectName:[{ required: true, message: '项目不能为空！', whitespace: true }],
        requirement:[{ required: true, message: '工作要求不能为空！', whitespace: true }],
        scoringCriteria:[{ required: true, message: '评价标准不能为空！', whitespace: true }],
        description:[{ required: true, message: '问题描述不能为空！', whitespace: true }],
        evaluationOpinion:[{ required: true, message: '评估意见不能为空！', whitespace: true }],
        checkPoint:[{ required: true, message: '检查点不能为空！', whitespace: true }],
        jdjg: [{ required: true, message: '检定结果不能为空！', whitespace: true }],
        tjyy: [{ required: true, message: '体检医院不能为空！', whitespace: true }],
        zsbh: [{ required: true, message: '证书编号不能为空！', whitespace: true }],
        name: [{ required: true, message: '名称不能为空！', whitespace: true }],
        place:[{ required: true, message: '地点不能为空！', whitespace: true }],
        content:[{ required: true, message: '内容不能为空！', whitespace: true }]
      } // 表单验证规则
    }
  },
  methods: {
    // 开关改变
    switchChange(checked, item) {
      this.form[item] = checked ? '1' : '0'
    },
    // 选择单位
    unitSelect() {
      this.$refs.ProjectUnitDialog.visible = true
    },
    // 单位选择成功
    unitSelectSuccess(units) {
      const threeId = units[0].split('/')[2].split('-')[0]
      this.form.thirdLevelArchiveId = threeId
      this.form.checkCompanyName = units[0].split('/')[0].split('-')[1] + '/' + units[0].split('/')[1].split('-')[1] + '/' + units[0].split('/')[2].split('-')[1]
      getUnit3Jobs({ id: threeId }).then(res => {
        if (res) this.jcgwSelectData = res
      })
    },
    //分厂名称下拉框改变
    fcSelectChange(selectedItems) {
      this.cjSelectData = []
      const erSanData = JSON.parse(localStorage.getItem('unitInfo23'))
      erSanData.forEach(item => {
        if (item.name === selectedItems) this.cjSelectData = item.thirdLevelArchivesList
      })
    },
    // 确认
    isOk() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.okBtnLoading = true
          let outsourcedUnitAssess = new FormData()
          switch (this.bottomTableOperateDialogFlag) {
            case 'resumptionSet':
              if (this.type === 'projectTableAdd') {
                resumptionSetAdd1(this.form).then(res => this.operateResult(res))
              } else if (this.type === 'projectTableEdit') {
                resumptionSetEdit1(this.form).then(res => this.operateResult(res))
              }
              break
            case 'riskPointSet':
              if (this.type === 'projectTableAdd') {
                if (this.nowTabInfo.param === 'checkProject') {
                  riskPointSetAdd1(this.form).then(res => this.operateResult(res))
                } else {
                  riskPointSetAdd2(this.form).then(res => this.operateResult(res))
                }
              } else if (this.type === 'projectTableEdit') {
                riskPointSetEdit2(this.form).then(res => this.operateResult(res))
              }
              break
            case 'riskPointCheck':
              riskPointCheckEdit1(this.form).then(res => this.operateResult(res))
              break
            case 'majorInsceptionSet':
              if (this.type === 'projectTableAdd') {
                if (this.nowTabInfo.param === 'CheckListDetail') {
                  majorInsceptionAdd1(this.form).then(res => this.operateResult(res))
                }
              } else if (this.type === 'projectTableEdit') {
                majorInsceptionSetEdit1([ this.form ]).then(res => this.operateResult(res))
              }
              break
            case 'majorInsceptionSubmit':
              majorInsceptionSubmitEdit([ this.form ]).then(res => this.operateResult(res))
              break
            case 'weeklyWrite':
              weeklyWriteEditAll(this.nowTabInfo.param, [this.form]).then(res => this.operateResult(res))
              break
            case 'outsourcedUnitProcess':
              if (this.type === 'projectTableAdd') {
                switch (this.nowTabInfo.param) {
                  case 'educationTrain':
                    outsourcedUnitProcessAdd1(this.form).then(res => this.operateResult(res))
                    break
                  case 'hazardRecord':
                    outsourcedUnitProcessAdd2(this.form).then(res => this.operateResult(res))
                    break
                  case 'inspectionRecord':
                    outsourcedUnitProcessAdd3(this.form).then(res => this.operateResult(res))
                    break
                  case 'rectificationRecord':
                    outsourcedUnitProcessAdd4(this.form).then(res => this.operateResult(res))
                    break
                }
              } else if (this.type === 'projectTableEdit') {
                outsourcedUnitProcessChildEdit(this.nowTabInfo.param, [this.form]).then(res => this.operateResult(res))
              }
              break
            case 'outsourcedUnitFileManage':
              outsourcedUnitFileManageChildEdit([this.form]).then(res => this.operateResult(res))
              break
            case 'outsourcedUnitAssess':
              if (this.type === 'projectTableAdd') {
                for (const item in this.form) {
                  outsourcedUnitAssess.append(item, this.form[item])
                }
                outsourcedUnitAssessAdd1(outsourcedUnitAssess).then(res => this.operateResult(res))
              } else if (this.type === 'projectTableEdit') {
                outsourcedUnitAssessEdit1(this.form).then(res => this.operateResult(res))
              }
              break
            case 'performanceMaintain':
              performanceMaintainEdit1([this.form]).then(res => this.operateResult(res))
              break
            case 'module':
              if (this.type === 'projectTableAdd') {
                moduleAdd1(this.form).then(res => this.operateResult(res))
              } else if (this.type === 'projectTableEdit') {
                moduleEdit1(this.form).then(res => this.operateResult(res))
              }
              break
            case 'branch':
              if (this.type === 'projectTableAdd') {
                branchAdd1(this.form).then(res => this.operateResult(res))
              } else if (this.type === 'projectTableEdit') {
                branchEdit1(this.form).then(res => this.operateResult(res))
              }
              break
            case 'workshop':
              if (this.type === 'projectTableAdd') {
                switch (this.nowTabInfo.param) {
                  case 'teamFile':
                    workshopAdd1(this.form).then(res => this.operateResult(res))
                    break
                  case 'userProfile':
                    workshopAdd2(this.form).then(res => this.operateResult(res))
                    break
                  case 'thirdLevelJob':
                    workshopAdd4(this.form).then(res => this.operateResult(res))
                    break
                  case 'thirdLevelPosition':
                    workshopAdd5(this.form).then(res => this.operateResult(res))
                    break
                }
              } else if (this.type === 'projectTableEdit') {
                switch (this.nowTabInfo.param) {
                  case 'teamFile':
                    workshopEdit1(this.form).then(res => this.operateResult(res))
                    break
                  case 'userProfile':
                    workshopEdit2(this.form).then(res => this.operateResult(res))
                    break
                  case 'thirdLevelJob':
                    workshopEdit4(this.form).then(res => this.operateResult(res))
                    break
                  case 'thirdLevelPosition':
                    workshopEdit5(this.form).then(res => this.operateResult(res))
                    break
                }
              }
              break
            case 'dictionaries':
              if (this.type === 'projectTableAdd') {
                dictionariesAdd1(this.form).then(res => this.operateResult(res))
              } else if (this.type === 'projectTableEdit') {
                dictionariesEdit1(this.form).then(res => this.operateResult(res))
              }
              break
            case 'hiddenDanger':
              if (this.type === 'projectTableAdd') {
                hiddenDangerAdd1(this.form).then(res => this.operateResult(res))
              } else if (this.type === 'projectTableEdit') {
                hiddenDangerEdit1(this.form).then(res => this.operateResult(res))
              }
              break
            case 'riskCheckStandard':
              riskCheckStandardEdit1(this.form).then(res => this.operateResult(res))
              break
            case 'protectionFile':
              if (this.type === 'projectTableAdd') {
                if (this.nowTabInfo.param === 'facilityInspectionDetails') {
                  protectionFileAdd1(this.form).then(res => this.operateResult(res))
                } else {
                  protectionFileAdd2(this.form).then(res => this.operateResult(res))
                }
              } else if (this.type === 'projectTableEdit') {
                if (this.nowTabInfo.param === 'facilityInspectionDetails') {
                  protectionFileEdit1(this.form).then(res => this.operateResult(res))
                } else {
                  protectionFileEdit2(this.form).then(res => this.operateResult(res))
                }
              }
              break
            case 'maintainEmergencyPlan':
              if (this.type === 'projectTableAdd') {
                executeSituationAdd1(this.form).then(res => this.operateResult(res))
              } else if (this.type === 'projectTableEdit') {
                executeSituationEdit1(this.form).then(res => this.operateResult(res))
              }
              break
            case 'specialEquipmentMaintain':
              specialEquipmentMaintainOperate1(this.form).then(res => this.operateResult(res))
              break
            case 'healthMaintain':
              if (this.nowTabInfo.param === 'physicalExaminationRecord') {
                healthMaintainOperate1(this.form).then(res => this.operateResult(res))
              } else {
                healthMaintainOperate2(this.form).then(res => this.operateResult(res))
              }
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

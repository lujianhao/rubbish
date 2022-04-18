const bottomTableColumns = {
    users: [
        { title: '人员工号', dataIndex: 'workNum', align: 'center' },
        { title: '人员姓名', dataIndex: 'name', align: 'center' },
        { title: '单位名称', dataIndex: 'unitName', align: 'center' },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 120 }
    ],
    workDetails: [
        { title: '序号', dataIndex: 'num', align: 'center', isNumberInput: true, width: 120 },
        { title: '考核要素', dataIndex: 'keyTest', align: 'center', isInput: true, ellipsis: true },
        { title: '评价要点', dataIndex: 'mainEvaluation', align: 'center', isTextarea: true, ellipsis: true },
        { title: '责任标准/频次', dataIndex: 'liabilityStandardsFrequency', align: 'center', isInput: true },
        { title: '评价细则', dataIndex: 'evaluationRules', align: 'center', isTextarea: true, ellipsis: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 160, noShow: true }
    ],
    resumptionSubmit: [
        { title: '序号', dataIndex: 'num', align: 'center', width: 120 },
        { title: '考核要素', dataIndex: 'keyTest', align: 'center', ellipsis: true },
        { title: '评价要点', dataIndex: 'mainEvaluation', align: 'center', ellipsis: true },
        { title: '责任标准/频次', dataIndex: 'liabilityStandardsFrequency', align: 'center' },
        { title: '得分', dataIndex: 'score', align: 'center', scopedSlots: { customRender: 'score' }, width: 120, sorter: true },
        { title: '备注', dataIndex: 'note', align: 'center', scopedSlots: { customRender: 'note' }, ellipsis: true, width: 500 }
    ],
    resumptionSearch: [
        { title: '序号', dataIndex: 'num', align: 'center', width: 120 },
        { title: '考核要素', dataIndex: 'keyTest', align: 'center', ellipsis: true },
        { title: '评价要点', dataIndex: 'mainEvaluation', align: 'center', ellipsis: true },
        { title: '责任标准/频次', dataIndex: 'liabilityStandardsFrequency', align: 'center' },
        { title: '得分', dataIndex: 'score', align: 'center', width: 120, sorter: true },
        { title: '备注', dataIndex: 'note', align: 'center', ellipsis: true, width: 500 }
    ],
    checkProject: [
        { title: '序号', dataIndex: 'number', align: 'center', scopedSlots: { customRender: 'number' }, isNumberInput: true, width: 120 },
        { title: '检查项目', dataIndex: 'checkProject', align: 'center', scopedSlots: { customRender: 'checkProject' }, isInput: true, ellipsis: true },
        { title: '检查标准', dataIndex: 'checkStandard', align: 'center', scopedSlots: { customRender: 'checkStandard' }, isTextarea: true, ellipsis: true },
        { title: '检查点', dataIndex: 'checkPoint', align: 'center', scopedSlots: { customRender: 'checkPoint' }, isInput: true, ellipsis: true },
        { title: '检查内容', dataIndex: 'checkContent', align: 'center', scopedSlots: { customRender: 'checkContent' }, isTextarea: true, ellipsis: true, width: 500 },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 120, noShow: true }
    ],
    cycleSet: [
        { title: '检查单位', dataIndex: 'checkCompanyName', align: 'center', ellipsis: true },
        { title: '检查岗位', dataIndex: 'checkWorkName', align: 'center', ellipsis: true },
        { title: '检查周期', dataIndex: 'checkCycle', align: 'center', ellipsis: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 240 }
    ],
    riskPointCheck: [
        { title: '序号', dataIndex: 'number', align: 'center', width: 120 },
        { title: '检查项目', dataIndex: 'checkProject', align: 'center', ellipsis: true },
        { title: '检查标准', dataIndex: 'checkStandard', align: 'center', ellipsis: true },
        { title: '检查点', dataIndex: 'checkPoint', align: 'center', ellipsis: true },
        { title: '检查内容', dataIndex: 'checkContent', align: 'center', ellipsis: true },
        { title: '检查情况', dataIndex: 'checkCondition', align: 'center', ellipsis: true },
        { title: '问题描述', dataIndex: 'questionDescription', align: 'center', ellipsis: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 120 }
    ],
    riskPointSearch: [
        { title: '工单日期', dataIndex: 'orderTime', align: 'center', ellipsis: true },
        { title: '截至日期', dataIndex: 'orderStopTime', align: 'center', ellipsis: true, sorter: true },
        { title: '检查岗位', dataIndex: 'checkWorkName', align: 'center', ellipsis: true },
        { title: '检查人', dataIndex: 'checkPeople', align: 'center', ellipsis: true },
        { title: '检查时间', dataIndex: 'checkTime', align: 'center', ellipsis: true },
        { title: '单据状态', dataIndex: 'orderStatus', align: 'center', ellipsis: true },
        { title: '是否下隐患单', dataIndex: 'dangerListConfirm', align: 'center', ellipsis: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 260 }
    ],
    riskPointListSearch: [
        { title: '序号', dataIndex: 'number', align: 'center', width: 120 },
        { title: '检查项目', dataIndex: 'checkProject', align: 'center', ellipsis: true },
        { title: '检查标准', dataIndex: 'checkStandard', align: 'center', ellipsis: true },
        { title: '检查点', dataIndex: 'checkPoint', align: 'center', ellipsis: true },
        { title: '检查内容', dataIndex: 'checkContent', align: 'center', ellipsis: true },
        { title: '检查情况', dataIndex: 'checkCondition', align: 'center', ellipsis: true },
        { title: '问题描述', dataIndex: 'questionDescription', align: 'center', ellipsis: true }
    ],
    CheckListDetail: [
        { title: '序号', dataIndex: 'num', align: 'center', isNumberInput: true, width: 120 },
        { title: '要素', dataIndex: 'element', align: 'center', isInput: true, ellipsis: true },
        { title: '项目', dataIndex: 'projectName', align: 'center', isInput: true, ellipsis: true },
        { title: '项目总分', dataIndex: 'totalScore', align: 'center', isNumberInput: true, width: 120 },
        { title: '工作要求', dataIndex: 'requirement', align: 'center', isTextarea: true, ellipsis: true },
        { title: '评价标准', dataIndex: 'scoringCriteria', align: 'center', isTextarea: true, ellipsis: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 120, noShow: true }
    ],
    checkedUnit: [
        { title: '单位名称', dataIndex: 'unitName', align: 'center' },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 120 }
    ],
    checkPersonal: [
        { title: '工号', dataIndex: 'workNum', align: 'center' },
        { title: '姓名', dataIndex: 'userName', align: 'center' },
        { title: '所在单位', dataIndex: 'userUnit', align: 'center' },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 120 }
    ],
    majorInsceptionSubmit: [
        { title: '序号', dataIndex: 'number', align: 'center', isInput: true, disabled: true, width: 120 },
        { title: '要素', dataIndex: 'element', align: 'center', isInput: true, disabled: true, ellipsis: true },
        { title: '项目', dataIndex: 'project', align: 'center', isInput: true, disabled: true, ellipsis: true },
        { title: '项目总分', dataIndex: 'projectScore', align: 'center', isInput: true, disabled: true, width: 120 },
        { title: '工作要求', dataIndex: 'workRequirements', align: 'center', isInput: true, disabled: true, ellipsis: true },
        { title: '评价标准', dataIndex: 'evaluationStandard', align: 'center', isInput: true, disabled: true, ellipsis: true },
        { title: '扣分', dataIndex: 'decduction', align: 'center', isNumberInput: true, width: 120 },
        { title: '备注', dataIndex: 'note', align: 'center', isTextarea: true, ellipsis: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 120, noShow: true }
    ],
    majorInsceptionSearch: [
        { title: '序号', dataIndex: 'number', align: 'center', width: 120 },
        { title: '要素', dataIndex: 'element', align: 'center', ellipsis: true },
        { title: '项目', dataIndex: 'project', align: 'center', ellipsis: true },
        { title: '项目总分', dataIndex: 'projectScore', align: 'center', width: 120 },
        { title: '工作要求', dataIndex: 'workRequirements', align: 'center', ellipsis: true },
        { title: '评价标准', dataIndex: 'evaluationStandard', align: 'center', ellipsis: true },
        { title: '扣分', dataIndex: 'decduction', align: 'center', width: 120 },
        { title: '备注', dataIndex: 'note', align: 'center', ellipsis: true }
    ],
    majorInsceptionCollect: [
        { title: '检查日期', dataIndex: 'startDate', align: 'center', ellipsis: true },
        { title: '专业', dataIndex: 'professionalType', align: 'center', ellipsis: true },
        { title: '总分', dataIndex: 'score', align: 'center', width: 120, sorter: true },
        { title: '检查人', dataIndex: 'checkerName', align: 'center', ellipsis: true },
        { title: '检查单位', dataIndex: 'checkerUnit', align: 'center', ellipsis: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 240 }
    ],
    weeklyReportDetails22660: [
        { title: '填报单位', dataIndex: 'unit', align: 'center' },
        { title: '工作内容', dataIndex: 'workContent', align: 'center', ellipsis: true },
        { title: '需协调内容', dataIndex: 'coordinateContent', align: 'center', ellipsis: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 120, noShow: true }
    ],
    completionWeeklyGoals: [
        { title: '完成数量', dataIndex: 'FinishedNum', align: 'center', isNumberInput: true, sorter: true },
        { title: '未完成数量', dataIndex: 'noFinishNum', align: 'center', isNumberInput: true, sorter: true },
        { title: '未完成说明', dataIndex: 'uncompletionDescription', align: 'center', isTextarea: true, ellipsis: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 120, noShow: true }
    ],
    safetyTrainingManagementWeeklyReport: [
        { title: '级别', dataIndex: 'level', align: 'center', isInput: true, disabled: true },
        { title: '项目', dataIndex: 'project', align: 'center', isInput: true, ellipsis: true },
        { title: '数量', dataIndex: 'quantity', align: 'center', isNumberInput: true, width: 120, sorter: true },
        { title: '备注', dataIndex: 'remark', align: 'center', isTextarea: true, ellipsis: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 120, noShow: true }
    ],
    cadresDutiesWeeklyReportDetails: [
        { title: '厂级副职人数', dataIndex: 'factoryDeputyNumber', align: 'center', isNumberInput: true, sorter: true },
        { title: '厂级检查人数', dataIndex: 'factoryCheckNumber', align: 'center', isNumberInput: true, sorter: true },
        { title: '科级副职人数', dataIndex: 'sectionDeputyNumber', align: 'center', isNumberInput: true, sorter: true },
        { title: '科级检查人数', dataIndex: 'sectionCheckNumber', align: 'center', isNumberInput: true, sorter: true },
        { title: '班组总数', dataIndex: 'teamTotal', align: 'center', isNumberInput: true, sorter: true },
        { title: '班组检查数量', dataIndex: 'teamCheckNumber', align: 'center', isNumberInput: true, sorter: true },
        { title: '履职情况分析', dataIndex: 'dutyPerformanceAnalysis', align: 'center', isTextarea: true, ellipsis: true, width: 300 },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 120, noShow: true }
    ],
    riskControlWeeklyReport: [
        { title: '工单数量', dataIndex: 'listNumber', align: 'center', isNumberInput: true, sorter: true },
        { title: '已排查数量', dataIndex: 'checkedNumber', align: 'center', isNumberInput: true, sorter: true },
        { title: '未排查小计', dataIndex: 'uncheckedTotal', align: 'center', isNumberInput: true, sorter: true },
        { title: '分厂级未排查数量', dataIndex: 'uncheckedBranch', align: 'center', isNumberInput: true, sorter: true },
        { title: '车间级未排查数量', dataIndex: 'uncheckedWorkshop', align: 'center', isNumberInput: true, sorter: true },
        { title: '班组级未排查数量', dataIndex: 'uncheckedTeam', align: 'center', isNumberInput: true, sorter: true },
        { title: '完成率(%)', dataIndex: 'completeRate', align: 'center', isPercentage: true, sorter: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 120, noShow: true }
    ],
    troubleshootingGovernanceWeeklyReport: [
        { title: '厂级检查次数', dataIndex: 'factoryCheckNumber', align: 'center', isNumberInput: true, sorter: true, width: 140 },
        { title: '厂级发现隐患', dataIndex: 'factoryFindHidden', align: 'center', isNumberInput: true, sorter: true, width: 140 },
        { title: '厂级完成整改', dataIndex: 'factoryCompleteRectification', align: 'center', isNumberInput: true, sorter: true, width: 140 },
        { title: '厂级整改率(%)', dataIndex: 'factoryCorrectionRate', align: 'center', isPercentage: true, sorter: true, width: 140 },
        { title: '车间检查次数', dataIndex: 'workshopCheckNumber', align: 'center', isNumberInput: true, sorter: true, width: 140 },
        { title: '车间发现隐患', dataIndex: 'workshopFindHidden', align: 'center', isNumberInput: true, sorter: true, width: 140 },
        { title: '车间完成整改', dataIndex: 'workshopCompleteRectification', align: 'center', isNumberInput: true, sorter: true, width: 140 },
        { title: '车间整改率(%)', dataIndex: 'workshopCorrectionRate', align: 'center', isPercentage: true, sorter: true, width: 140 },
        { title: '班组检查次数', dataIndex: 'teamCheckNumber', align: 'center', isNumberInput: true, sorter: true, width: 140 },
        { title: '班组发现隐患', dataIndex: 'teamFindHidden', align: 'center', isNumberInput: true, sorter: true, width: 140 },
        { title: '班组完成整改', dataIndex: 'teamCompleteRectification', align: 'center', isNumberInput: true, sorter: true, width: 140 },
        { title: '班组整改率(%)', dataIndex: 'teamCorrectionRate', align: 'center', isPercentage: true, sorter: true, width: 140 },
        { title: '总结分析', dataIndex: 'analyzed', align: 'center', isTextarea: true, ellipsis: true, width: 140 },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 100, noShow: true }
    ],
    hazardousWorkWeeklyReport: [
        { title: '重大风险', dataIndex: 'significantRisk', align: 'center', isNumberInput: true },
        { title: '较大风险', dataIndex: 'greaterRisk', align: 'center', isNumberInput: true },
        { title: '一般风险', dataIndex: 'generalRisk', align: 'center', isNumberInput: true },
        { title: '低风险', dataIndex: 'lowRisk', align: 'center', isNumberInput: true },
        { title: '小计', dataIndex: 'subtotal', align: 'center', isNumberInput: true },
        { title: '过程安全管控情况', dataIndex: 'securityControl', align: 'center', isTextarea: true, ellipsis: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 120, noShow: true }
    ],
    outsourcingUnitManageWeeklyReport: [
        { title: 'A类数量', dataIndex: 'quantityA', align: 'center', isNumberInput: true, sorter: true, width: 140 },
        { title: 'A类人数', dataIndex: 'numberA', align: 'center', isNumberInput: true, sorter: true, width: 140 },
        { title: 'A类隐患数', dataIndex: 'hiddenA', align: 'center', isNumberInput: true, sorter: true, width: 140 },
        { title: 'A类检查次数', dataIndex: 'checkA', align: 'center', isNumberInput: true, sorter: true, width: 140 },
        { title: 'A类整改率(%)', dataIndex: 'rectificationRateA', align: 'center', isPercentage: true, sorter: true, width: 140 },
        { title: 'B类数量', dataIndex: 'quantityB', align: 'center', isNumberInput: true, sorter: true, width: 140 },
        { title: 'B类人数', dataIndex: 'numberB', align: 'center', isNumberInput: true, sorter: true, width: 140 },
        { title: 'B类隐患数', dataIndex: 'hiddenB', align: 'center', isNumberInput: true, sorter: true, width: 140 },
        { title: 'B类检查次数', dataIndex: 'checkB', align: 'center', isNumberInput: true, sorter: true, width: 140 },
        { title: 'B类整改率(%)', dataIndex: 'rectificationRateB', align: 'center', isPercentage: true, sorter: true, width: 140 },
        { title: 'C类数量', dataIndex: 'quantityC', align: 'center', isNumberInput: true, sorter: true, width: 140 },
        { title: 'C类人数', dataIndex: 'numberC', align: 'center', isNumberInput: true, sorter: true, width: 140 },
        { title: 'C类隐患数', dataIndex: 'hiddenC', align: 'center', isNumberInput: true, sorter: true, width: 140 },
        { title: 'C类检查次数', dataIndex: 'checkC', align: 'center', isNumberInput: true, sorter: true, width: 140 },
        { title: 'C类整改率(%)', dataIndex: 'rectificationRateC', align: 'center', isPercentage: true, sorter: true, width: 140 },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 100, noShow: true }
    ],
    standardizedInspectionManagerWeeklyReport: [
        { title: '践行SOP数量', dataIndex: 'sopPracticeNum', align: 'center', isNumberInput: true, width: 140, sorter: true },
        { title: '践行计划数量', dataIndex: 'planNum', align: 'center', isNumberInput: true, width: 140, sorter: true },
        { title: '践行实际数量', dataIndex: 'actualNum', align: 'center', isNumberInput: true, width: 140, sorter: true },
        { title: '践行率(%)', dataIndex: 'practiceRate', align: 'center', isPercentage: true, width: 120, sorter: true },
        { title: '践行需再修数量', dataIndex: 'practiceAgainNum', align: 'center', isNumberInput: true, width: 160, sorter: true },
        { title: '抽查员工人数', dataIndex: 'checkEmployeesNum', align: 'center', isNumberInput: true, width: 140, sorter: true },
        { title: '抽查SOP计划人数', dataIndex: 'sopCheckPlanNum', align: 'center', isNumberInput: true, width: 160, sorter: true },
        { title: '抽查实际人数', dataIndex: 'checkActualNum', align: 'center', isNumberInput: true, width: 140, sorter: true },
        { title: '抽查率(%)', dataIndex: 'checkRate', align: 'center', isPercentage: true, width: 120, sorter: true },
        { title: '抽查通过率(%)', dataIndex: 'checkPassRate', align: 'center', isPercentage: true, width: 140, sorter: true },
        { title: '抽查通过人数', dataIndex: 'checkPassNum', align: 'center', isNumberInput: true, width: 140, sorter: true },
        { title: '抽查月通过人数', dataIndex: 'checkPassNumMonthly', align: 'center', isNumberInput: true, width: 160, sorter: true },
        { title: '观察员工人数', dataIndex: 'observeEmployees', align: 'center', isNumberInput: true, width: 140, sorter: true },
        { title: '观察计划人数', dataIndex: 'observePlanNum', align: 'center', isNumberInput: true, width: 140, sorter: true },
        { title: '实际观察人数', dataIndex: 'observeActualNum', align: 'center', isNumberInput: true, width: 140, sorter: true },
        { title: '观察率(%)', dataIndex: 'observeRate', align: 'center', isPercentage: true, width: 120, sorter: true },
        { title: '合格率(%)', dataIndex: 'passRate', align: 'center', isPercentage: true, width: 120, sorter: true },
        { title: '观察月合格人数', dataIndex: 'observeMonthlyNum', align: 'center', isNumberInput: true, width: 160, sorter: true },
        { title: '备注', dataIndex: 'note', align: 'center', isTextarea: true, ellipsis: true, width: 300 },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 120, fixed: 'right', noShow: true }
    ],
    postBanManageWeeklyReport: [
        { title: '计划抽查人数', dataIndex: 'planCheckNumber', align: 'center', isNumberInput: true, width: 140, sorter: true },
        { title: '实际抽查人数', dataIndex: 'actualCheckNumber', align: 'center', isNumberInput: true, width: 140, sorter: true },
        { title: '抽查率（%）', dataIndex: 'checkRate', align: 'center', isPercentage: true, width: 140, sorter: true },
        { title: '通过率（%）', dataIndex: 'completeRate', align: 'center', isPercentage: true, width: 140, sorter: true },
        { title: '月度累计通过人数', dataIndex: 'cumulativePass', align: 'center', isNumberInput: true, width: 180, sorter: true },
        { title: '厂级发现三违（内部）', dataIndex: 'threeViolationsInterior', align: 'center', isNumberInput: true, width: 200, sorter: true },
        { title: '厂级发现三违（相关方）', dataIndex: 'threeViolationsRelated', align: 'center', isNumberInput: true, width: 200, sorter: true },
        { title: '车间级发现三违（内部）', dataIndex: 'workshopThreeViolationsInterior', align: 'center', isNumberInput: true, width: 200, sorter: true },
        { title: '车间级发现三违（相关方）', dataIndex: 'workshopThreeViolationsRelated', align: 'center', isNumberInput: true, width: 220, sorter: true },
        { title: '班组级发现三违（内部）', dataIndex: 'teamThreeViolationsInterior', align: 'center', isNumberInput: true, width: 200, sorter: true },
        { title: '班组级发现三违（相关方）', dataIndex: 'teamThreeViolationsRelated', align: 'center', isNumberInput: true, width: 220, sorter: true },
        { title: '员工举报三违（内部）', dataIndex: 'staffThreeViolationsInterior', align: 'center', isNumberInput: true, width: 200, sorter: true },
        { title: '员工举报三违（相关方）', dataIndex: 'staffThreeViolationsRelated', align: 'center', isNumberInput: true, width: 220, sorter: true },
        { title: '过五关（内部）', dataIndex: 'passFiveInterior', align: 'center', isNumberInput: true, width: 160, sorter: true },
        { title: '过五关（相关方）', dataIndex: 'passFiveViolationsRelated', align: 'center', isNumberInput: true, width: 160, sorter: true },
        { title: '备注', dataIndex: 'note', align: 'center', isTextarea: true, ellipsis: true, width: 300 },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 120, fixed: 'right', noShow: true }
    ],
    emergencyManageWeeklyReport: [
        { title: '完善应急物资清单（项）', dataIndex: 'completeList', align: 'center', isNumberInput: true, width: 200, sorter: true },
        { title: '检查维护应急物资(次数)', dataIndex: 'checkEmergencySupplies', align: 'center', isNumberInput: true, width: 200, sorter: true },
        { title: '公司级(计划)', dataIndex: 'companyPlan', align: 'center', isNumberInput: true, width: 150, sorter: true },
        { title: '公司级(实施)', dataIndex: 'companyImplementation', align: 'center', isNumberInput: true, width: 150, sorter: true },
        { title: '公司级(参加人数)', dataIndex: 'companyNumber', align: 'center', isNumberInput: true, width: 180, sorter: true },
        { title: '公司级(计划完成率)(%)', dataIndex: 'companyCompleteRate', align: 'center', isPercentage: true, width: 200, sorter: true },
        { title: '厂级(计划)', dataIndex: 'factoryPlan', align: 'center', isNumberInput: true, width: 150, sorter: true },
        { title: '厂级(实施)', dataIndex: 'factoryImplementation', align: 'center', isNumberInput: true, width: 150, sorter: true },
        { title: '厂级(参加人数)', dataIndex: 'factoryNumber', align: 'center', isNumberInput: true, width: 180, sorter: true },
        { title: '厂级(计划完成率)(%)', dataIndex: 'factoryCompleteRate', align: 'center', isPercentage: true, width: 200, sorter: true },
        { title: '车间级(计划)', dataIndex: 'workshopPlan', align: 'center', isNumberInput: true, width: 150, sorter: true },
        { title: '车间级(实施)', dataIndex: 'workshopImplementation', align: 'center', isNumberInput: true, width: 150, sorter: true },
        { title: '车间级(参加人数)', dataIndex: 'workshopNumber', align: 'center', isNumberInput: true, width: 180, sorter: true },
        { title: '车间级(计划完成率)(%)', dataIndex: 'workshopCompleteRate', align: 'center', isPercentage: true, width: 200, sorter: true },
        { title: '班组级(计划)', dataIndex: 'teamPlan', align: 'center', isNumberInput: true, width: 150, sorter: true },
        { title: '班组级(实施)', dataIndex: 'teamImplementation', align: 'center', isNumberInput: true, width: 150, sorter: true },
        { title: '班组级(参加人数)', dataIndex: 'teamNumber', align: 'center', isNumberInput: true, width: 180, sorter: true },
        { title: '班组级(计划完成率)(%)', dataIndex: 'teamCompleteRate', align: 'center', isPercentage: true, width: 200, sorter: true },
        { title: '备注', dataIndex: 'note', align: 'center', isTextarea: true, ellipsis: true, width: 300 },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 120, fixed: 'right', noShow: true }
    ],
    professionalManageWeeklyReport: [
        { title: '煤气发现隐患', dataIndex: 'gasFindHidden', align: 'center', isNumberInput: true, width: 150, sorter: true },
        { title: '煤气完成整改', dataIndex: 'gasCompleteRectification', align: 'center', isNumberInput: true, width: 150, sorter: true },
        { title: '煤气整改率(%)', dataIndex: 'gasRectificationRate', align: 'center', isPercentage: true, width: 150, sorter: true },
        { title: '融金发现隐患', dataIndex: 'financeFindHidden', align: 'center', isNumberInput: true, width: 150, sorter: true },
        { title: '融金完成整改', dataIndex: 'financeCompleteRectification', align: 'center', isNumberInput: true, width: 150, sorter: true },
        { title: '融金整改率(%)', dataIndex: 'financeRectificationRate', align: 'center', isPercentage: true, width: 150, sorter: true },
        { title: '特种设备发现隐患', dataIndex: 'specialEquipmentFindHidden', align: 'center', isNumberInput: true, width: 180, sorter: true },
        { title: '特种设备完成整改', dataIndex: 'specialEquipmentCompleteRectification', align: 'center', isNumberInput: true, width: 180, sorter: true },
        { title: '特种设备整改率(%)', dataIndex: 'specialEquipmentRectificationRate', align: 'center', isPercentage: true, width: 180, sorter: true },
        { title: '有限空间发现隐患', dataIndex: 'confinedSpaceFindHidden', align: 'center', isNumberInput: true, width: 180, sorter: true },
        { title: '有限空间完成整改', dataIndex: 'confinedSpaceCompleteRectification', align: 'center', isNumberInput: true, width: 180, sorter: true },
        { title: '有限空间整改率(%)', dataIndex: 'confinedSpaceEquipmentRectificationRate', align: 'center', isPercentage: true, width: 180, sorter: true },
        { title: '交通、消防、粉尘爆炸专业管理发现隐患', dataIndex: 'trafficFindHidden', align: 'center', isNumberInput: true, width: 320, sorter: true },
        { title: '交通、消防、粉尘爆炸专业管理完成整改', dataIndex: 'trafficCompleteRectification', align: 'center', isNumberInput: true, width: 320, sorter: true },
        { title: '交通、消防、粉尘爆炸专业管理整改率(%)', dataIndex: 'trafficEquipmentRectificationRate', align: 'center', isPercentage: true, width: 320, sorter: true },
        { title: '工艺技术管理发现隐患', dataIndex: 'artCraftsFindHidden', align: 'center', isNumberInput: true, width: 200, sorter: true },
        { title: '工艺技术管理完成整改', dataIndex: 'artCraftsCompleteRectification', align: 'center', isNumberInput: true, width: 200, sorter: true },
        { title: '工艺技术管理整改率(%)', dataIndex: 'artCraftsEquipmentRectificationRate', align: 'center', isPercentage: true, width: 200, sorter: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 120, fixed: 'right', noShow: true }
    ],
    educationTrain: [
        { title: '开始日期', dataIndex: 'startDate', align: 'center', isDatePicker: true, ellipsis: true },
        { title: '培训时长', dataIndex: 'timeDescription', align: 'center', isInput: true, ellipsis: true },
        { title: '地点', dataIndex: 'place', align: 'center', isInput: true, ellipsis: true },
        { title: '内容', dataIndex: 'content', align: 'center', isTextarea: true, ellipsis: true },
        { title: '参加人员', dataIndex: 'participant', align: 'center', isInput: true, ellipsis: true },
        { title: '效果评估', dataIndex: 'effectEvaluation', align: 'center', isTextarea: true, ellipsis: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 240, noShow: true }
    ],
    hazardRecord: [
        { title: '检查日期', dataIndex: 'checkDate', align: 'center', isDatePicker: true, ellipsis: true },
        { title: '检查时间', dataIndex: 'checkTime', align: 'center', isTimePicker: true, ellipsis: true },
        { title: '隐患地点', dataIndex: 'hiddenPlace', align: 'center', isInput: true, ellipsis: true },
        { title: '隐患内容', dataIndex: 'hiddenContent', align: 'center', isTextarea: true, ellipsis: true },
        { title: '要求整改时间', dataIndex: 'rectificationTime', align: 'center', isDatePicker: true, ellipsis: true },
        { title: '整改情况', dataIndex: 'rectificationStatus', align: 'center', isTextarea: true, ellipsis: true },
        { title: '检查人', dataIndex: 'checker', align: 'center', isInput: true, ellipsis: true },
        { title: '备注', dataIndex: 'note', align: 'center', isTextarea: true, ellipsis: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 240, noShow: true }
    ],
    inspectionRecord: [
        { title: '巡检日期', dataIndex: 'inspectionDate', align: 'center', isDatePicker: true, ellipsis: true },
        { title: '巡检时间', dataIndex: 'inspectionTime', align: 'center', isTimePicker: true, ellipsis: true },
        { title: '检查人', dataIndex: 'checker', align: 'center', isInput: true, ellipsis: true },
        { title: '检查地点', dataIndex: 'checkLocation', align: 'center', isInput: true, ellipsis: true },
        { title: '检查情况', dataIndex: 'checkStatus', align: 'center', isTextarea: true, ellipsis: true },
        { title: '备注', dataIndex: 'note', align: 'center', isTextarea: true, ellipsis: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 240, noShow: true }
    ],
    rectificationRecord: [
        { title: '填报日期', dataIndex: 'fillDate', align: 'center', isDatePicker: true, ellipsis: true },
        { title: '问题描述', dataIndex: 'description', align: 'center', isTextarea: true, ellipsis: true },
        { title: '整改情况', dataIndex: 'rectification', align: 'center', isTextarea: true, ellipsis: true },
        { title: '检查人', dataIndex: 'checker', align: 'center', isInput: true, ellipsis: true },
        { title: '备注', dataIndex: 'note', align: 'center', isTextarea: true, ellipsis: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 240, noShow: true }
    ],
    outsourcedUnitAssess: [
        { title: '评估分数', dataIndex: 'evaluationScore', align: 'center' },
        { title: '事故清退类型', dataIndex: 'accidentType', align: 'center' },
        { title: '评估意见', dataIndex: 'evaluationOpinion', align: 'center', ellipsis: true, width: 500 },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 320 }
    ],
    outsourcedUnitFileManage: [
        { title: '工程名称', dataIndex: 'projectName', align: 'center', ellipsis: true },
        { title: '签约单位', dataIndex: 'contractingUnit', align: 'center', ellipsis: true },
        { title: '外委单位', dataIndex: 'outsourceUnitName', align: 'center', ellipsis: true },
        { title: '施工单位', dataIndex: 'constructionUnit', align: 'center', ellipsis: true },
        { title: '工程状态', dataIndex: 'projectStatus', align: 'center', width: 120 },
        { title: '计划开始日期', dataIndex: 'planStartTime', align: 'center', ellipsis: true, sorter: true },
        { title: '计划结束日期', dataIndex: 'planStopTime', align: 'center', ellipsis: true, sorter: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 120 }
    ],
    evaluationRecord: [
        { title: '填报日期', dataIndex: 'fillDate', align: 'center', ellipsis: true },
        { title: '外委单位', dataIndex: 'outsourceUnitName', align: 'center', ellipsis: true },
        { title: '填报单位', dataIndex: 'fillUnit', align: 'center', ellipsis: true },
        { title: '填报人', dataIndex: 'informant', align: 'center', ellipsis: true },
        { title: '评估结论', dataIndex: 'evaluationOpinion', align: 'center', ellipsis: true },
        { title: '评估分数', dataIndex: 'evaluationScore', align: 'center', ellipsis: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 120 }
    ],
    outsourcedUnitFileSearch: [
        { title: '工程名称', dataIndex: 'projectName', align: 'center', ellipsis: true },
        { title: '签约单位', dataIndex: 'contractingUnit', align: 'center', ellipsis: true },
        { title: '施工单位', dataIndex: 'constructionUnit', align: 'center', ellipsis: true },
        { title: '工程负责人', dataIndex: 'projectManager', align: 'center', ellipsis: true },
        { title: '负责人联系方式', dataIndex: 'contantInformation', align: 'center', ellipsis: true },
        { title: '计划开始日期', dataIndex: 'planStartTime', align: 'center', ellipsis: true, sorter: true },
        { title: '计划结束日期', dataIndex: 'planStopTime', align: 'center', ellipsis: true, sorter: true },
        { title: '实际开始日期', dataIndex: 'startDate', align: 'center', ellipsis: true, sorter: true },
        { title: '实际结束日期', dataIndex: 'stopDate', align: 'center', ellipsis: true, sorter: true },
        { title: '工程状态', dataIndex: 'projectStatus', align: 'center', width: 100 },
        { title: '工程内容', dataIndex: 'projectContent', align: 'center', ellipsis: true },
        { title: '施工请况', dataIndex: 'constructionStatus', align: 'center', ellipsis: true }
    ],
    performanceMaintain: [
        { title: '一级要素', dataIndex: 'primaryElement', align: 'center', ellipsis: true, isInput: true, disabled: true },
        { title: '二级要素', dataIndex: 'secondaryElement', align: 'center', ellipsis: true, isInput: true, disabled: true },
        { title: '标准分值', dataIndex: 'standardScore', align: 'center', width: 120, isInput: true, disabled: true },
        { title: '评分', dataIndex: 'score', align: 'center', width: 120, isNumberInput: true },
        { title: '存在情况', dataIndex: 'question', align: 'center', ellipsis: true, isTextarea: true },
        { title: '扣分情况', dataIndex: 'deductions', align: 'center', ellipsis: true, isTextarea: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 160, noShow: true }
    ],
    performanceSearch: [
        { title: '一级要素', dataIndex: 'primaryElement', align: 'center', ellipsis: true },
        { title: '二级要素', dataIndex: 'secondaryElement', align: 'center', ellipsis: true },
        { title: '标准分值', dataIndex: 'standardScore', align: 'center', width: 120 },
        { title: '评分', dataIndex: 'score', align: 'center', width: 120, sorter: true },
        { title: '存在情况', dataIndex: 'question', align: 'center', ellipsis: true },
        { title: '扣分情况', dataIndex: 'deductions', align: 'center', ellipsis: true, sorter: true }
    ],
    riskCheckStandard: [
        { title: '序号', dataIndex: 'number', align: 'center', width: 120 },
        { title: '级别', dataIndex: 'level', align: 'center' },
        { title: '周期', dataIndex: 'cycle', align: 'center' },
        { title: '是否执行', dataIndex: 'execute', align: 'center', scopedSlots: { customRender: 'isBoolean' } },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 160 }
    ],
    riskInvestigationDetails: [
        { title: '序号', dataIndex: 'number', align: 'center', width: 120 },
        { title: '内容', dataIndex: 'checkContent', align: 'center', ellipsis: true },
        { title: '检查情况', dataIndex: 'checkResult', align: 'center', ellipsis: true }
    ],
    securityHazardsList: [
        { title: '隐患时间', dataIndex: 'hiddenDate', align: 'center', ellipsis: true },
        { title: '设施与风险点', dataIndex: 'riskPoint', align: 'center', ellipsis: true },
        { title: '处理措施', dataIndex: 'dealMeasure', align: 'center', ellipsis: true },
        { title: '整改执行人', dataIndex: 'changerExecutor', align: 'center', ellipsis: true },
        { title: '整改复查人', dataIndex: 'reviewer', align: 'center', ellipsis: true },
        { title: '是否制定整改方案', dataIndex: 'rectificationPlan', align: 'center', ellipsis: true },
        { title: '整改期限', dataIndex: 'rectificationPeriod', align: 'center', ellipsis: true },
        { title: '状态', dataIndex: 'recordStatus', align: 'center', ellipsis: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 160 }
    ],
    riskHistoryInvestigationDetails: [
        { title: '序号', dataIndex: 'number', align: 'center', width: 120 },
        { title: '内容', dataIndex: 'checkContent', align: 'center', ellipsis: true },
        { title: '检查情况', dataIndex: 'checkResult', align: 'center', ellipsis: true }
    ],
    riskScreeningClassificationStatistics: [
        { title: '序号', dataIndex: 'number', align: 'center', width: 120 },
        { title: '级别', dataIndex: 'level', align: 'center', ellipsis: true },
        { title: '总数', dataIndex: 'quantity', align: 'center', sorter: true },
        { title: '正常数量', dataIndex: 'normalQuantity', align: 'center', sorter: true },
        { title: '异常数量', dataIndex: 'abnormalQuantity', align: 'center', sorter: true },
        { title: '完成率(%)', dataIndex: 'completionRate', align: 'center', sorter: true },
        { title: '未检占比数量', dataIndex: 'proportion', align: 'center', sorter: true }
    ],
    facilityInspectionRecord: [
        { title: '工单日期', dataIndex: 'orderDate', align: 'center', ellipsis: true },
        { title: '班次', dataIndex: 'shift', align: 'center', ellipsis: true },
        { title: '地点', dataIndex: 'place', align: 'center', ellipsis: true },
        { title: '岗位', dataIndex: 'checkPosition', align: 'center', ellipsis: true },
        { title: '检查人', dataIndex: 'checker', align: 'center', ellipsis: true },
        { title: '检查日期', dataIndex: 'checkFeedbackTime', align: 'center', ellipsis: true, sorter: true },
        { title: '截至日期', dataIndex: 'stopDate', align: 'center', ellipsis: true, sorter: true },
        { title: '设备设施', dataIndex: 'equipment', align: 'center', ellipsis: true },
        { title: '管控责任人', dataIndex: 'responsiblePerson', align: 'center', ellipsis: true },
        { title: '检查情况', dataIndex: 'checkResult', align: 'center', ellipsis: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 120 }
    ],
    notCheckFacilityInspectionRecord: [
        { title: '工单日期', dataIndex: 'orderDate', align: 'center', ellipsis: true },
        { title: '班次', dataIndex: 'shift', align: 'center', ellipsis: true },
        { title: '地点', dataIndex: 'place', align: 'center', ellipsis: true },
        { title: '岗位', dataIndex: 'checkPosition', align: 'center', ellipsis: true },
        { title: '检查人', dataIndex: 'checker', align: 'center', ellipsis: true },
        { title: '检查日期', dataIndex: 'checkFeedbackTime', align: 'center', ellipsis: true, sorter: true },
        { title: '截至日期', dataIndex: 'stopDate', align: 'center', ellipsis: true, sorter: true },
        { title: '设备设施', dataIndex: 'equipment', align: 'center', ellipsis: true },
        { title: '管控责任人', dataIndex: 'responsiblePerson', align: 'center', ellipsis: true },
        { title: '检查情况', dataIndex: 'checkResult', align: 'center', ellipsis: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 120 }
    ],
    abnormalFacilityInspectionRecord: [
        { title: '工单日期', dataIndex: 'orderDate', align: 'center', ellipsis: true },
        { title: '班次', dataIndex: 'shift', align: 'center', ellipsis: true },
        { title: '地点', dataIndex: 'place', align: 'center', ellipsis: true },
        { title: '岗位', dataIndex: 'checkPosition', align: 'center', ellipsis: true },
        { title: '检查人', dataIndex: 'checker', align: 'center', ellipsis: true },
        { title: '检查日期', dataIndex: 'checkFeedbackTime', align: 'center', ellipsis: true, sorter: true },
        { title: '截至日期', dataIndex: 'stopDate', align: 'center', ellipsis: true , sorter: true},
        { title: '设备设施', dataIndex: 'equipment', align: 'center', ellipsis: true },
        { title: '管控责任人', dataIndex: 'responsiblePerson', align: 'center', ellipsis: true },
        { title: '检查情况', dataIndex: 'checkResult', align: 'center', ellipsis: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 120 }
    ],
    hiddenClassificationStatistics: [
        { title: '序号', dataIndex: 'number', align: 'center', width: 120 },
        { title: '大类', dataIndex: 'category', align: 'center', ellipsis: true },
        { title: '类型', dataIndex: 'type', align: 'center', ellipsis: true },
        { title: '总数', dataIndex: 'total', align: 'center', sorter: true },
        { title: '关闭数量', dataIndex: 'closeNum', align: 'center', sorter: true },
        { title: '未关闭数量', dataIndex: 'uncloseNum', align: 'center', sorter: true },
        { title: '整改率(%)', dataIndex: 'changeRate', align: 'center', sorter: true },
        { title: '占总数比(%)', dataIndex: 'proportion', align: 'center', sorter: true }
    ],
    hiddenDangerDetails: [
        { title: '隐患日期', dataIndex: 'hiddenDate', align: 'center', ellipsis: true },
        { title: '责任单位', dataIndex: 'dutyUnit', align: 'center', ellipsis: true },
        { title: '责任人', dataIndex: 'responsible', align: 'center', ellipsis: true },
        { title: '处理状态', dataIndex: 'recordStatus', align: 'center', width: 120 },
        { title: '隐患分类', dataIndex: 'hiddenClassification', align: 'center', ellipsis: true },
        { title: '整改执行人', dataIndex: 'changerExecutor', align: 'center', ellipsis: true },
        { title: '整改时间', dataIndex: 'changeCompeteTime', align: 'center', ellipsis: true, sorter: true },
        { title: '复查人', dataIndex: 'reviewer', align: 'center', ellipsis: true },
        { title: '复查时间', dataIndex: 'reviewDate', align: 'center', ellipsis: true, sorter: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 160 }
    ],
    uncloseSecurityHazardsList: [
        { title: '隐患日期', dataIndex: 'hiddenDate', align: 'center', ellipsis: true },
        { title: '责任单位', dataIndex: 'dutyUnit', align: 'center', ellipsis: true },
        { title: '责任人', dataIndex: 'responsible', align: 'center', ellipsis: true },
        { title: '处理状态', dataIndex: 'recordStatus', align: 'center', width: 120 },
        { title: '隐患分类', dataIndex: 'hiddenClassification', align: 'center', ellipsis: true },
        { title: '整改执行人', dataIndex: 'changerExecutor', align: 'center', ellipsis: true },
        { title: '整改时间', dataIndex: 'changeCompeteTime', align: 'center', ellipsis: true, sorter: true },
        { title: '复查人', dataIndex: 'reviewer', align: 'center', ellipsis: true },
        { title: '复查时间', dataIndex: 'reviewDate', align: 'center', ellipsis: true, sorter: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 160 }
    ],
    facilityInspectionDetails: [
        { title: '序号', dataIndex: 'number', align: 'center', isNumberInput: true, width: 120 },
        { title: '检查点', dataIndex: 'checkPoint', align: 'center', isInput: true, ellipsis: true },
        { title: '检查项目', dataIndex: 'checkProject', align: 'center', isTextarea: true, ellipsis: true },
        { title: '检查标准', dataIndex: 'checkStandard', align: 'center', isTextarea: true, ellipsis: true },
        { title: '检查内容', dataIndex: 'checkContent', align: 'center', isTextarea: true, ellipsis: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 160, noShow: true }
    ],
    facilityInspectionPost: [
        { title: '分厂名称', dataIndex: 'branch', align: 'center', ellipsis: true },
        { title: '车间名称', dataIndex: 'workshop', align: 'center', ellipsis: true },
        { title: '岗位名称', dataIndex: 'postName', align: 'center', ellipsis: true },
        { title: '检查周期', dataIndex: 'checkCycle', align: 'center', ellipsis: true },
        { title: '最后检查日期', dataIndex: 'finallyCheckDate', align: 'center', ellipsis: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 160, noShow: true }
    ],
    facilityInspectionOrderDetails: [
        { title: '序号', dataIndex: 'number', align: 'center', isNumberInput: true, width: 120 },
        { title: '检查点', dataIndex: 'checkPoint', align: 'center', isInput: true, ellipsis: true },
        { title: '检查项目', dataIndex: 'checkProject', align: 'center', isTextarea: true, ellipsis: true },
        { title: '检查标准', dataIndex: 'checkStandard', align: 'center', isTextarea: true, ellipsis: true },
        { title: '检查内容', dataIndex: 'checkContent', align: 'center', isTextarea: true, ellipsis: true }
    ],
    securityHazardsListS: [
        { title: '隐患日期', dataIndex: 'hiddenDate', align: 'center', ellipsis: true },
        { title: '隐患地点', dataIndex: 'hiddenPlace', align: 'center', ellipsis: true },
        { title: '责任单位', dataIndex: 'dutyUnit', align: 'center', ellipsis: true },
        { title: '责任人', dataIndex: 'responsible', align: 'center', ellipsis: true },
        { title: '处理状态', dataIndex: 'recordStatus', align: 'center', ellipsis: true },
        { title: '隐患分类', dataIndex: 'hiddenClassification', align: 'center', ellipsis: true },
        { title: '整改执行人', dataIndex: 'changerExecutor', align: 'center', ellipsis: true },
        { title: '整改日期', dataIndex: 'changeCompeteTime', align: 'center', ellipsis: true },
        { title: '复查人', dataIndex: 'reviewer', align: 'center', ellipsis: true },
        { title: '复查日期', dataIndex: 'reviewDate', align: 'center', ellipsis: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 160 }
    ],
    executeSituation: [
        { title: '计划日期', dataIndex: 'planDate', align: 'center', isDatePicker: true, ellipsis: true, sorter: true },
        { title: '执行日期', dataIndex: 'executeDate', align: 'center', isDatePicker: true, ellipsis: true, sorter: true },
        { title: '执行单位', dataIndex: 'executeUnit', align: 'center', isInput: true, ellipsis: true },
        { title: '执行地点', dataIndex: 'executePlace', align: 'center', isInput: true, ellipsis: true },
        { title: '执行情况', dataIndex: 'executeSituation', align: 'center', isTextarea: true, ellipsis: true },
        { title: '参与人员', dataIndex: 'participateUnit', align: 'center', isTextarea: true, ellipsis: true },
        { title: '执行评估', dataIndex: 'backResults', align: 'center', isTextarea: true, ellipsis: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 160, noShow: true }
    ],
    specialEquipmentMaintain: [
        { title: '检定日期', dataIndex: 'jdrq', align: 'center', ellipsis: true },
        { title: '检定单位', dataIndex: 'jddw', align: 'center', ellipsis: true },
        { title: '检定结果', dataIndex: 'jdjg', align: 'center', ellipsis: true },
        { title: '下次检验日期', dataIndex: 'xcjyrq', align: 'center', ellipsis: true },
        { title: '检验前自检结论', dataIndex: 'jyqzjjl', align: 'center', ellipsis: true, width: 160 },
        { title: '实际检验情况', dataIndex: 'sjjyqk', align: 'center', ellipsis: true },
        { title: '检验整改情况', dataIndex: 'jyzgqk', align: 'center', ellipsis: true },
        { title: '检验机构检验结论', dataIndex: 'jgjyjl', align: 'center', ellipsis: true, width: 160 },
        { title: '备注', dataIndex: 'bz', align: 'center', ellipsis: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 160 }
    ],
    physicalExaminationRecord: [
        { title: '体检日期', dataIndex: 'tjrq', align: 'center', isDatePicker: true, ellipsis: true },
        { title: '体检医院', dataIndex: 'tjyy', align: 'center', isInput: true, ellipsis: true },
        { title: '体检结论', dataIndex: 'tjjl', align: 'center', isTextarea: true, ellipsis: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 160, noShow: true }
    ],
    certificateHolding: [
        { title: '证书类型', dataIndex: 'zslx', align: 'center', ellipsis: true, width: 120 },
        { title: '证书编号', dataIndex: 'zsbh', align: 'center', ellipsis: true, width: 200 },
        { title: '有效期', dataIndex: 'yxq', align: 'center', ellipsis: true, width: 120 },
        { title: '发证日期', dataIndex: 'fzrq', align: 'center', ellipsis: true, width: 120 },
        { title: '复审日期1', dataIndex: 'fsrq1', align: 'center', ellipsis: true, width: 120 },
        { title: '实际复审日期1', dataIndex: 'sjfsrq1', align: 'center', ellipsis: true, width: 120 },
        { title: '复审日期2', dataIndex: 'fsrq2', align: 'center', ellipsis: true, width: 120 },
        { title: '实际复审日期2', dataIndex: 'sjfsrq2', align: 'center', ellipsis: true, width: 120 },
        { title: '截止日期', dataIndex: 'jzrq', align: 'center', ellipsis: true, width: 120 },
        { title: '发证单位', dataIndex: 'fzdw', align: 'center', ellipsis: true, width: 180 },
        { title: '作业类别', dataIndex: 'zylb', align: 'center', ellipsis: true, width: 120 },
        { title: '适用范围', dataIndex: 'syfw', align: 'center', ellipsis: true, width: 120 },
        { title: '是否超期', dataIndex: 'sfcq', align: 'center', ellipsis: true, width: 120 },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 160, fixed: 'right' }
    ],
    module: [
        { title: '序号', dataIndex: 'qxlbXh', align: 'center', isNumberInput: true, width: 120 },
        { title: '名称', dataIndex: 'qxlbMc', align: 'center', ellipsis: true, isInput: true },
        { title: '路由地址', dataIndex: 'qxlbMkurl', align: 'center', isInput: true, disabled: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 160, noShow: true }
    ],
    branch: [
        { title: '编号', dataIndex: 'num', align: 'center', width: 120 },
        { title: '名称', dataIndex: 'name', align: 'center', ellipsis: true },
        { title: '安全管理单位', dataIndex: 'safeManagementUnit', align: 'center' },
        { title: '风险排查单位', dataIndex: 'riskInvestigationUnit', align: 'center' },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 160 }
    ],
    thirdLevelOrganization: [
        { title: '模块大类', dataIndex: 'typeName', align: 'center', ellipsis: true },
        { title: '模块名称', dataIndex: 'name', align: 'center', ellipsis: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 120 }
    ],
    teamFile: [
        { title: '序号', dataIndex: 'number', align: 'center', width: 120, isNumberInput: true },
        { title: '名称', dataIndex: 'name', align: 'center', ellipsis: true, isInput: true },
        { title: '备注', dataIndex: 'note', align: 'center', ellipsis: true, isTextarea: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 160, noShow: true }
    ],
    thirdLevelJob: [
        { title: '序号', dataIndex: 'num', align: 'center', width: 120, isNumberInput: true },
        { title: '名称', dataIndex: 'name', align: 'center', ellipsis: true, isInput: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 160, noShow: true }
    ],
    thirdLevelPosition: [
        { title: '序号', dataIndex: 'number', align: 'center', width: 120, isNumberInput: true },
        { title: '名称', dataIndex: 'name', align: 'center', ellipsis: true, isInput: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 160, noShow: true }
    ],
    userProfile: [
        { title: '工号', dataIndex: 'workNum', align: 'center', width: 100 },
        { title: '名称', dataIndex: 'name', align: 'center', width: 100 },
        { title: '性别', dataIndex: 'gender', align: 'center', width: 80 },
        { title: '身份证号', dataIndex: 'idNumber', align: 'center', ellipsis: true },
        { title: '职务', dataIndex: 'position', align: 'center', ellipsis: true },
        { title: '岗位工种', dataIndex: 'jobs', align: 'center', ellipsis: true },
        { title: '查询范围', dataIndex: 'operatingRange', align: 'center', width: 100 },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 380 }
    ],
    systemRolePermissions: [
        { title: '大类', dataIndex: 'typeName', align: 'center', ellipsis: true },
        { title: '名称', dataIndex: 'name', align: 'center', ellipsis: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 120 }
    ],
    systemRoleUser: [
        { title: '工号', dataIndex: 'workNum', align: 'center' },
        { title: '名称', dataIndex: 'name', align: 'center', ellipsis: true },
        { title: '所在单位', dataIndex: 'unit', align: 'center', ellipsis: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 120 }
    ],
    dictionaries: [
        { title: '序号', dataIndex: 'num', align: 'center', width: 120, isNumberInput: true },
        { title: '名称', dataIndex: 'name', align: 'center', ellipsis: true, isInput: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 160, noShow: true }
    ],
    hiddenDangerType: [
        { title: '序号', dataIndex: 'number', align: 'center', width: 120, isNumberInput: true },
        { title: '名称', dataIndex: 'name', align: 'center', ellipsis: true, isInput: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 160, noShow: true }
    ]
}
export default bottomTableColumns

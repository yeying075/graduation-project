<script setup lang="ts">
const TAG = {
  TITLE: '面试',
  resume_name: '简历名称',
  user_uid: '用户id',
  user_name: '用户名'
}

const rules = {}

const handleSearchChange = () => {
  getData()
}

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const data = ref([])
const loading = ref(true)
const resume_option = ref({})
const getData = async () => {
  const {
    data: { data: res }
  } = await req
    .post(`/api/v1/resume/list`, {
      page: currentPage.value,
      size: pageSize.value,
      resume_option: resume_option.value
    })
    .then()
  console.log(res)
  data.value = res.resume_list
  total.value = res.count
}
onMounted(async () => {
  await getData()
  loading.value = false
})

const insertDialogVisible = ref(false)
const insertForm = ref({
  resume_info: {}
})
const handleConfirmInsert = async () => {
  await req.post(`/api/v1/resume`, insertForm.value)
  await getData()
  insertDialogVisible.value = false
}

const updateDialogVisible = ref(false)
const updateForm = ref({})
const handleUpdate = async (form) => {
  updateForm.value = form
  updateDialogVisible.value = true
}
const handleConfirmUpdate = async () => {
  await req.put(``, updateForm.value)
  await getData()
  updateDialogVisible.value = false
}

const deleteDialogVisible = ref(false)
const deleteId = ref()
const handleDelete = async (id) => {
  deleteId.value = id
  deleteDialogVisible.value = true
}
const handleConfirmDelete = async () => {
  await req.delete(`/api/v1/resume`, {
    data: {
      resume_id: deleteId.value
    }
  })
  await getData()
  deleteDialogVisible.value = false
}
const dialogVisibleCheck = ref(false)
const CheckForm = ref({})
const handleCheck = async (id) => {
  const {
    data: { data: res }
  } = await req.post(`/api/v1/resume/${id}/detail`).then()
  CheckForm.value = res.data
  dialogVisibleCheck.value = true
}

const handleCurrentChange = () => {
  getData()
}

const dialogInputRef = ref()
const handleDialogOpened = async () => {
  dialogInputRef.value.focus()
}

const SearchProject = async (queryString, cb) => {
  const {
    data: { data: res }
  } = await req.post(`/api/v1/resume/project/tree`).then()
  cb(res)
}
const filterForm = ref({})
const filterDialogVisible = ref(false)
const handleFilter = () => {
  resume_option.value = { ...filterForm.value }
  // resume_option.value.title = [filterForm.value.title]
  // resume_option.value.userName = [filterForm.value.userName]
  // resume_option.value.startAt = [filterForm.value.startAt]
  // resume_option.value.endAt = [filterForm.value.endAt]
  getData()
  filterDialogVisible.value = false
}
</script>

<template>
  <div class="block">
    <el-button type="primary" size="large" @click="insertDialogVisible = true">添加简历</el-button>
    <el-table class="table" table-layout="auto" border :data="data" v-loading="loading">
      <el-table-column prop="resume_name" :label="TAG.resume_name">
        <template #default="scope">
          <el-button @click="handleCheck(scope.row.id)">{{ scope.row.resume_name }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="user_uid" :label="TAG.user_uid"> </el-table-column>
      <el-table-column prop="user_name" :label="TAG.user_name"> </el-table-column>
      <el-table-column align="right">
        <template #header>
          <!--          <el-row justify="end" class="colRight">-->
          <!--            <el-col :span="18">-->
          <!--              <el-input-->
          <!--                class="input"-->
          <!--                size="small"-->
          <!--                style="width: 50%"-->
          <!--                placeholder="查询"-->
          <!--                v-model.trim="search"-->
          <!--                @change="handleSearchChange"-->
          <!--              />-->
          <!--            </el-col>-->
          <!--            <el-col :span="6">-->
          <!--          <el-button type="primary" size="default" @click="insertDialogVisible = true"-->
          <!--            >新增</el-button-->
          <!--          >-->
          <!--            </el-col>-->
          <!--          </el-row>-->
          <el-button type="primary" size="default" @click="filterDialogVisible = true"
            >筛选</el-button
          >
        </template>
        <template #default="scope">
          <!--          <el-button type="primary" size="default" @click="handleUpdate(scope.row)">编辑</el-button>-->
          <el-button
            class="rightButton"
            type="danger"
            size="default"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-block">
      <el-pagination
        :page-size="pageSize"
        :total="total"
        :pager-count="9"
        background
        layout="total, prev, pager, next, jumper"
        v-model:current-page="currentPage"
        @current-change="handleCurrentChange"
      />
    </div>

    <el-dialog
      class="insertDialog"
      :title="`添加${TAG.TITLE}`"
      width="400px"
      align-center
      v-model="insertDialogVisible"
    >
      <el-form
        :model="insertForm"
        :rules="rules"
        label-width="80"
        status-icon
        hide-required-asterisk
      >
        <el-form-item class="item" :label="TAG.resume_name" prop="resume_name">
          <el-input v-model.trim="insertForm.resume_name" />
        </el-form-item>
        <el-form-item class="item" label="项目id列表" prop="user_name">
          <el-input v-model.trim="insertForm.project_ids" />
        </el-form-item>
        <el-form-item class="item" label="名称" prop="user_uid">
          <el-input v-model.trim="insertForm.resume_info.name" />
        </el-form-item>
        <el-form-item class="item" label="学院id" prop="user_uid">
          <el-input v-model.trim="insertForm.resume_info.college_hash_id" />
        </el-form-item>
        <el-form-item class="item" label="专业id" prop="user_name">
          <el-input v-model.trim="insertForm.resume_info.porfession_hash_id" />
        </el-form-item>
        <el-form-item class="item" label="描述" prop="p4">
          <el-input v-model.trim="insertForm.resume_info.describe" />
        </el-form-item>
        <el-form-item class="item" label="经历" prop="p5">
          <el-input v-model.trim="insertForm.resume_info.experience" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleConfirmInsert">提交</el-button>
          <el-button @click="insertDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      v-model="updateDialogVisible"
      class="updateDialog"
      :title="`编辑${TAG.TITLE}`"
      width="400px"
      align-center
    >
      <el-form
        :model="updateForm"
        :rules="rules"
        label-width="80"
        status-icon
        hide-required-asterisk
      >
        <el-form-item class="item" :label="TAG.resume_name" prop="resume_name">
          <el-input v-model.trim="updateForm.resume_name" />
        </el-form-item>
        <el-form-item class="item" :label="TAG.user_uid" prop="user_uid">
          <el-input v-model.trim="updateForm.user_uid" />
        </el-form-item>
        <el-form-item class="item" :label="TAG.user_name" prop="user_name">
          <el-input v-model.trim="updateForm.user_name" />
        </el-form-item>
        <el-form-item class="item" :label="TAG.p4" prop="p4">
          <el-input v-model.trim="updateForm.p4" />
        </el-form-item>
        <el-form-item class="item" :label="TAG.p5" prop="p5">
          <el-input v-model.trim="updateForm.p5" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleConfirmUpdate">提交</el-button>
          <el-button @click="updateDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      class="deleteDialog"
      v-model="deleteDialogVisible"
      :title="`删除${TAG.TITLE}`"
      width="400px"
      align-center
    >
      <span>确定删除该{{ TAG.TITLE }}？</span>
      <template #footer>
        <span class="dialogFooter">
          <el-button type="primary" size="large" @click="handleConfirmDelete">确定</el-button>
          <el-button size="large" @click="deleteDialogVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>

  <el-dialog
    class="checkDialog"
    :title="`查看${TAG.TITLE}`"
    align-center
    v-model="dialogVisibleCheck"
  >
    <el-descriptions :title="TAG.TITLE" :column="3" size="" border>
      <template #title>
        <div class="checkDescriptionsTitle">{{ TAG.TITLE }}</div>
      </template>
      <el-descriptions-item :label="TAG.resume_name">
        {{ CheckForm.resume_name }}
      </el-descriptions-item>
      <el-descriptions-item :label="TAG.user_uid">
        {{ CheckForm.user_uid }}
      </el-descriptions-item>
      <el-descriptions-item :label="TAG.user_name">
        {{ CheckForm.user_name }}
      </el-descriptions-item>
      <el-descriptions-item label="学院名称">
        {{ CheckForm.basic_info.collegeName }}
      </el-descriptions-item>
      <el-descriptions-item label="描述">
        {{ CheckForm.basic_info.describe }}
      </el-descriptions-item>
      <el-descriptions-item label="经历">
        {{ CheckForm.basic_info.experience }}
      </el-descriptions-item>
      <el-descriptions-item label="名称">
        {{ CheckForm.basic_info.name }}
      </el-descriptions-item>
      <el-descriptions-item label="专业名称">
        {{ CheckForm.basic_info.porfessionName }}
      </el-descriptions-item>
      <el-descriptions-item label="项目id列表">
        {{ CheckForm.project_ids }}
      </el-descriptions-item>
    </el-descriptions>
  </el-dialog>
  <el-dialog
    class="insertDialog"
    title="筛选"
    width="400px"
    align-center
    v-model="filterDialogVisible"
  >
    <el-form :model="filterForm" :rules="rules" label-width="80" status-icon hide-required-asterisk>
      <el-form-item class="item" label="标题">
        <el-input v-model.trim="filterForm.title" />
      </el-form-item>
      <el-form-item class="item" label="用户名">
        <el-input v-model.trim="filterForm.userName" />
      </el-form-item>
      <el-form-item class="item" label="startAt">
        <el-input v-model.trim="filterForm.startAt" />
      </el-form-item>
      <el-form-item class="item" label="endAt">
        <el-input v-model.trim="filterForm.endAt" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleFilter">提交</el-button>
        <el-button @click="filterDialogVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped>
.block {
  //justify-content: start;
  text-align: start;
}
.block > :deep(.el-button) {
  margin: 10px;
}
.item {
  margin-bottom: 40px;
  width: 280px;
}

.pagination-block {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
</style>

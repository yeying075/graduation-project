<script setup lang="ts">
const TAG = {
  TITLE: '项目',
  project_name: '名称',
  title: '标题',
  status: '状态'
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
const project_name = ref()
const title = ref()
const professions = ref([])
const getData = async () => {
  const {
    data: { data: res }
  } = await req
    .post(`/api/v1/project/list`, {
      page: currentPage.value,
      size: pageSize.value,
      project_name: project_name.value,
      title: title.value,
      professions: professions.value
    })
    .then()
  data.value = res.projects
  total.value = res.count
}
onMounted(async () => {
  await getData()
  loading.value = false
})

const insertDialogVisible = ref(false)
const insertForm = ref({})
const handleConfirmInsert = async () => {
  await req.post(`/api/v1/project`, insertForm.value)
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
  await req.put(`/api/v1/project/changeStatus`, updateForm.value)
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
  await req.delete(`/api/v1/project`, {
    data: {
      id: deleteId.value
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
  } = await req.post(`/api/v1/project/detail`).then()
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
const handleMy = () => {
  router.push('/main/project')
}
const handleChoose = (id) => {
  req.post('/api/v1/project/choose', {
    project_id: id
  })
}
const filterForm = ref({})
const filterDialogVisible = ref(false)
const handleFilter = () => {
  // project_name.value = [filterForm.value.project_name]
  // title.value = [filterForm.value.title]
  // professions.value = [filterForm.value.professions]
  getData()
  filterDialogVisible.value = false
}
</script>

<template>
  <div class="block">
    <el-button type="primary" size="large" @click="handleMy">我的</el-button>
    <el-table class="table" table-layout="auto" border :data="data" v-loading="loading">
      <el-table-column prop="project_name" :label="TAG.project_name">
        <template #default="scope">
          <el-button @click="handleCheck(scope.row.id)">{{ scope.row.projectName }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="title" :label="TAG.title"> </el-table-column>
      <el-table-column prop="status" :label="TAG.status"> </el-table-column>
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
        </template>
        <template #default="scope">
          <el-button type="primary" size="default" @click="handleChoose(scope.row.id)"
            >选择</el-button
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
        <el-form-item class="item" :label="TAG.project_name" prop="project_name">
          <el-input v-model.trim="insertForm.project_name" />
        </el-form-item>
        <el-form-item class="item" :label="TAG.title" prop="title">
          <el-input v-model.trim="insertForm.title" />
        </el-form-item>
        <el-form-item class="item" label="专业id" prop="status">
          <el-input v-model.trim="insertForm.profession_hash_id" />
        </el-form-item>
        <el-form-item class="item" label="难度" prop="status">
          <el-select v-model="insertForm.difficulty">
            <el-option label="HARD" value="HARD" />
            <el-option label="EASY" value="EASY" />
            <el-option label="NORMAL" value="NORMAL" />
          </el-select>
        </el-form-item>
        <el-form-item class="item" label="背景描述" prop="status">
          <el-input v-model.trim="insertForm.back_ground" />
        </el-form-item>
        <el-form-item class="item" label="需求描述" prop="status">
          <el-input v-model.trim="insertForm.requirement" />
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
        <el-form-item class="item" :label="TAG.status" prop="status">
          <el-input v-model.trim="updateForm.status" />
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
      <el-descriptions-item :label="TAG.project_name">
        {{ CheckForm.projectName }}
      </el-descriptions-item>
      <el-descriptions-item :label="TAG.title">
        {{ CheckForm.title }}
      </el-descriptions-item>
      <el-descriptions-item :label="TAG.status">
        {{ CheckForm.status }}
      </el-descriptions-item>
      <el-descriptions-item label="难易程度">
        {{ CheckForm.projectBasicInfo.difficulty }}
      </el-descriptions-item>
      <el-descriptions-item label="背景描述">
        {{ CheckForm.projectBasicInfo.back_ground }}
      </el-descriptions-item>
      <el-descriptions-item label="需求描述">
        {{ CheckForm.projectBasicInfo.requirement }}
      </el-descriptions-item>
      <el-descriptions-item label="专业名称">
        {{ CheckForm.professionName }}
      </el-descriptions-item>
      <el-descriptions-item
        label="学院名称
"
      >
        {{ CheckForm.collegeName }}
      </el-descriptions-item>
      <el-descriptions-item label="创作者名称">
        {{ CheckForm.creator }}
      </el-descriptions-item>
      <el-descriptions-item label="审核者名称">
        {{ CheckForm.auditor }}
      </el-descriptions-item>
      <el-descriptions-item label="学生名称">
        {{ CheckForm.participator }}
      </el-descriptions-item>
      <el-descriptions-item label="学生所在班级">
        {{ CheckForm.participatorClassName }}
      </el-descriptions-item>
      <el-descriptions-item label="班级id">
        {{ CheckForm.participatorClassID }}
      </el-descriptions-item>
    </el-descriptions>
  </el-dialog>
  <!--  <el-dialog-->
  <!--    class="insertDialog"-->
  <!--    title="筛选"-->
  <!--    width="400px"-->
  <!--    align-center-->
  <!--    v-model="filterDialogVisible"-->
  <!--  >-->
  <!--    <el-form :model="filterForm" :rules="rules" label-width="80" status-icon hide-required-asterisk>-->
  <!--      <el-form-item class="item" label="专业">-->
  <!--        <el-autocomplete-->
  <!--          v-model="filterForm.profession_hash_id"-->
  <!--          :fetch-suggestions="SearchProfession"-->
  <!--          value-key="hash_id"-->
  <!--        >-->
  <!--          <template #default="{ item }">-->
  <!--            <div>{{ item.hash_id }}</div>-->
  <!--            <span>{{ item.profession_name }}</span>-->
  <!--          </template>-->
  <!--        </el-autocomplete>-->
  <!--      </el-form-item>-->
  <!--      <el-form-item class="item" label="项目名称">-->
  <!--        <el-input v-model.trim="filterForm.project_name" />-->
  <!--      </el-form-item>-->
  <!--      <el-form-item class="item" label="项目名称">-->
  <!--        <el-input v-model.trim="filterForm.professions" />-->
  <!--      </el-form-item>-->
  <!--      <el-form-item>-->
  <!--        <el-button type="primary" @click="handleFilter">提交</el-button>-->
  <!--        <el-button @click="filterDialogVisible = false">取消</el-button>-->
  <!--      </el-form-item>-->
  <!--    </el-form>-->
  <!--  </el-dialog>-->
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

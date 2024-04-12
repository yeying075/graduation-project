<script setup lang="ts">
const TAG = {
  TITLE: '用户',
  account: '账号',
  password: '密码',
  username: '用户名',
  name: '姓名',
  profession_name: '专业名称',
  class_name: '班级名称',
  role: '角色',
  profession_hash_id: '专业id',
  class_hash_id: '班级id',
  phone: '电话',
  email: '邮箱'
}
const getByIdUserAPI = (id) => {
  return req.post(`/api/v1/system/user/${id}/detail`)
}

const listUserAPI = (
  page,
  pageSize,
  user_name,
  profession_hash_ids,
  class_hash_ids,
  role_types
) => {
  return req.post('/api/v1/system/users/list', {
    page: page,
    size: pageSize,
    user_name: user_name,
    profession_hash_ids: profession_hash_ids,
    class_hash_ids: class_hash_ids,
    role_types: role_types
  })
}

const insertUserAPI = (user) => {
  return req.post('/api/v1/system/users', user)
}

const updateUserAPI = (user) => {
  return req.patch('/api/user', user)
}
const deleteUserAPI = (id) => {
  return req.delete('/api/v1/system/users', {
    params: {
      id: id
    }
  })
}
const listCollegeAPI = () => {
  return req.post('/api/v1/system/colleges/tree')
}
const insertCollegeAPI = (o) => {
  return req.post('/api/v1/system/colleges', o)
}
const deleteCollegeAPI = (id) => {
  return req.delete('/api/v1/system/colleges', { data: { college_hash_id: id } })
}
const listProfessionAPI = () => {
  return req.post('/api/v1/system/profession/tree')
}
const insertProfessionAPI = (o) => {
  return req.post('/api/v1/system/professions', o)
}
const deleteProfessionAPI = (id) => {
  return req.delete('/api/v1/system/professions', { params: { hash_id: id } })
}
const listClassAPI = (id) => {
  return req.post(`/api/v1/system/${id}/class/tree`)
}
const insertClassAPI = (o) => {
  return req.post('/api/v1/system/classes', o)
}
const deleteClassAPI = (id) => {
  return req.delete('/api/v1/system/classes', { params: { hash_id: id } })
}
const resetAPI = (id, password) => {
  return req.put(`/api/v1/system/users/${id}/password`, { password: password })
}

const rules = {}

const search = ref('')
const handleSearchChange = () => {
  getData()
}

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const data = ref([])
const loading = ref(true)
const getData = async () => {
  const {
    data: { data: res }
  } = await listUserAPI(
    currentPage.value,
    pageSize.value,
    search.value,
    profession_hash_ids.value,
    class_hash_ids.value,
    role_types.value
  ).then()
  console.log(res)
  data.value = res.items
  total.value = res.total
}
onMounted(async () => {
  await getData()
  loading.value = false
})

const insertDialogVisible = ref(false)
const insertForm = ref({})
const handleConfirmInsert = async () => {
  console.log(insertForm.value)
  await insertUserAPI(insertForm.value)
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
  await updateUserAPI(updateForm.value)
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
  await deleteUserAPI(deleteId.value)
  await getData()
  deleteDialogVisible.value = false
}
const dialogVisibleCheck = ref(false)
const CheckForm = ref({})
const handleCheck = async (id) => {
  const {
    data: { data: res }
  } = await getByIdUserAPI(id)
  console.log(res)
  // CheckForm.value =
  dialogVisibleCheck.value = true
}

const handleCurrentChange = () => {
  getData()
}

const dialogInputRef = ref()
const handleDialogOpened = async () => {
  dialogInputRef.value?.focus()
}

const querySearchString = ref('')

const insertCollegeDialogVisible = ref(false)
const insertCollegeForm = ref({ college_info: {} })
const handleCollegeInsert = async () => {
  await insertCollegeAPI(insertCollegeForm.value)
  // await getData()
  insertCollegeDialogVisible.value = false
}

const deleteCollegeDialogVisible = ref(false)
const deleteCollegeId = ref()
const handleCollegeDelete = async () => {
  await deleteCollegeAPI(deleteCollegeId.value)
  deleteDialogVisible.value = false
}
const SearchCollege = async (queryString, cb) => {
  const {
    data: { data: res }
  } = await listCollegeAPI()
  cb(res)
}

const insertProfessionDialogVisible = ref(false)
const insertProfessionForm = ref({ profession_info: {} })
const handleProfessionInsert = async () => {
  await insertProfessionAPI(insertProfessionForm.value)
  // await getData()
  insertProfessionDialogVisible.value = false
}

const deleteProfessionDialogVisible = ref(false)
const deleteProfessionId = ref()
const handleProfessionDelete = async () => {
  await deleteProfessionAPI(deleteProfessionId.value)
  deleteDialogVisible.value = false
}
const SearchProfession = async (queryString, cb) => {
  const {
    data: { data: res }
  } = await listProfessionAPI()
  cb(res)
}

const insertClassDialogVisible = ref(false)
const insertClassForm = ref({})
const handleClassInsert = async () => {
  await insertClassAPI(insertClassForm.value)
  // await getData()
  insertClassDialogVisible.value = false
}

const deleteClassDialogVisible = ref(false)
const deleteClassId = ref()
const handleClassDelete = async () => {
  await deleteClassAPI(deleteClassId.value)
  deleteDialogVisible.value = false
}
const SearchClass = async (queryString, cb) => {
  if (!filterForm.value.profession_hash_id) {
    ElMessage.warning('请先输入专业')
    return
  }
  const {
    data: { data: res }
  } = await listClassAPI(filterForm.value.profession_hash_id)
  if (!res) {
    ElMessage.warning('未找到班级')
    return
  }
  cb(res)
}
const profession_hash_ids = ref([])
const class_hash_ids = ref([])
const role_types = ref([])
const filterForm = ref({})
const filterDialogVisible = ref(false)
const handleFilter = () => {
  profession_hash_ids.value = [filterForm.value.profession_hash_id]
  class_hash_ids.value = [filterForm.value.class_hash_id]
  role_types.value = [filterForm.value.role_type]
  getData()
  filterDialogVisible.value = false
}

const resetId = ref()
const resetPassword = ref()
const resetDialogVisible = ref(false)
const handleReset = (id) => {
  resetId.value = id
  resetDialogVisible.value = true
}
const handleConfirmReset = async () => {
  console.log(resetId.value, resetPassword.value)
  await resetAPI(resetId.value, resetPassword.value)
  resetDialogVisible.value = false
}
</script>

<template>
  <div class="block">
    <el-button type="primary" size="large" @click="insertDialogVisible = true">添加用户</el-button>
    <el-button type="primary" size="large" @click="insertCollegeDialogVisible = true"
      >添加学院</el-button
    >
    <el-button type="primary" size="large" @click="insertProfessionDialogVisible = true"
      >添加专业</el-button
    >
    <el-button type="primary" size="large" @click="insertClassDialogVisible = true"
      >添加班级</el-button
    >
    <el-table class="table" table-layout="auto" border :data="data" v-loading="loading">
      <el-table-column prop="username" :label="TAG.username">
        <template #default="scope">
          <el-button @click="handleCheck(scope.row.id)">{{ scope.row.username }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="name" :label="TAG.name"> </el-table-column>
      <el-table-column prop="profession_name" :label="TAG.profession_name"> </el-table-column>
      <el-table-column prop="class_name" :label="TAG.class_name"> </el-table-column>
      <el-table-column prop="role" :label="TAG.role"> </el-table-column>
      <el-table-column align="right">
        <template #header>
          <el-row justify="end" class="colRight">
            <el-col :span="18">
              <el-input
                class="input"
                size="small"
                style="width: 50%"
                placeholder="查询"
                v-model.trim="search"
                @change="handleSearchChange"
              />
            </el-col>
            <el-col :span="6">
              <el-button type="primary" size="default" @click="filterDialogVisible = true"
                >筛选</el-button
              >
            </el-col>
          </el-row>
        </template>
        <template #default="scope">
          <el-button
            class="rightButton"
            type="danger"
            size="default"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
          <el-button type="primary" size="default" @click="handleUpdate(scope.row)">编辑</el-button>

          <el-button type="primary" size="default" @click="handleReset(scope.row.id)"
            >重置密码</el-button
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
      @opened="handleDialogOpened"
    >
      <el-form
        :model="insertForm"
        :rules="rules"
        label-width="80"
        status-icon
        hide-required-asterisk
      >
        <el-form-item class="item" :label="TAG.account">
          <el-input
            v-model.trim="insertForm.account"
            ref="dialogInputRef"
            @keyup.enter="handleConfirmInsert"
          />
        </el-form-item>
        <el-form-item class="item" :label="TAG.password">
          <el-input
            v-model.trim="insertForm.password"
            show-password
            @keyup.enter="handleConfirmInsert"
          />
        </el-form-item>
        <el-form-item class="item" :label="TAG.username">
          <el-input v-model.trim="insertForm.username" @keyup.enter="handleConfirmInsert" />
        </el-form-item>
        <el-form-item class="item" :label="TAG.role">
          <el-select v-model="insertForm.role">
            <el-option label="学院管理员" :value="'CollegeAdmin'" />
            <el-option label="老师" :value="'Teacher'" />
            <el-option label="学生" :value="'Student'" />
            <el-option label="企业人员" :value="'firm'" />
          </el-select>
        </el-form-item>
        <el-form-item class="item" :label="TAG.profession_hash_id">
          <el-autocomplete
            v-model="insertForm.profession_hash_id"
            :fetch-suggestions="SearchCollege"
            value-key="hash_id"
          >
            <template #default="{ item }">
              <div>{{ item.hash_id }}</div>
              <span>{{ item.college_name }}</span>
            </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item class="item" :label="TAG.class_hash_id">
          <el-autocomplete
            v-model="insertForm.college_hash_id"
            :fetch-suggestions="SearchCollege"
            value-key="hash_id"
          >
            <template #default="{ item }">
              <div>{{ item.hash_id }}</div>
              <span>{{ item.college_name }}</span>
            </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item class="item" :label="TAG.phone">
          <el-input v-model.trim="insertForm.phone" @keyup.enter="handleConfirmInsert" />
        </el-form-item>
        <el-form-item class="item" :label="TAG.email">
          <el-input v-model.trim="insertForm.email" @keyup.enter="handleConfirmInsert" />
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
      @opened="handleDialogOpened"
    >
      <el-form
        :model="updateForm"
        :rules="rules"
        label-width="80"
        status-icon
        hide-required-asterisk
      >
        <el-form-item class="item" :label="TAG.username" prop="username">
          <el-input
            v-model.trim="insertForm.username"
            ref="dialogInputRef"
            :placeholder="TAG.username"
            @keyup.enter="handleConfirmUpdate"
          />
        </el-form-item>
        <el-form-item class="item" :label="TAG.name" prop="name">
          <el-input
            v-model.trim="insertForm.password"
            :placeholder="TAG.name"
            @keyup.enter="handleConfirmUpdate"
          />
        </el-form-item>
        <el-form-item class="item" :label="TAG.profession_name" prop="profession_name">
          <el-input
            v-model.trim="insertForm.password"
            :placeholder="TAG.profession_name"
            @keyup.enter="handleConfirmUpdate"
          />
        </el-form-item>
        <el-form-item class="item" :label="TAG.class_name" prop="class_name">
          <el-input
            v-model.trim="insertForm.password"
            :placeholder="TAG.class_name"
            @keyup.enter="handleConfirmUpdate"
          />
        </el-form-item>
        <el-form-item class="item" :label="TAG.role" prop="role">
          <el-input
            v-model.trim="insertForm.password"
            :placeholder="TAG.role"
            @keyup.enter="handleConfirmUpdate"
          />
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

    <el-dialog
      class="checkDialog"
      :title="`查看${TAG.TITLE}`"
      align-center
      v-model="dialogVisibleCheck"
    >
      <el-descriptions title="用户" :column="3" size="" border>
        <template #title>
          <div class="checkDescriptionsTitle">用户</div>
        </template>
        <el-descriptions-item :label="TAG.username">
          {{ CheckForm.username }}
        </el-descriptions-item>
        <el-descriptions-item :label="TAG.name">
          {{ CheckForm.name }}
        </el-descriptions-item>
        <el-descriptions-item :label="TAG.profession_name">
          {{ CheckForm.profession_name }}
        </el-descriptions-item>
        <el-descriptions-item :label="TAG.class_name">
          {{ CheckForm.class_name }}
        </el-descriptions-item>
        <el-descriptions-item :label="TAG.role">
          {{ CheckForm.role }}
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>

    <el-dialog
      class="insertDialog"
      title="添加学院"
      width="400px"
      align-center
      v-model="insertCollegeDialogVisible"
      @opened="handleDialogOpened"
    >
      <el-form
        :model="insertCollegeForm"
        :rules="rules"
        label-width="80"
        status-icon
        hide-required-asterisk
      >
        <el-form-item class="item" label="学院名">
          <el-input ref="dialogInputRef" v-model.trim="insertCollegeForm.college_name" />
        </el-form-item>
        <el-form-item class="item" label="学院信息">
          <el-input v-model.trim="insertCollegeForm.college_info.Info" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleCollegeInsert">提交</el-button>
          <el-button @click="insertDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      class="deleteDialog"
      v-model="deleteCollegeDialogVisible"
      title="删除学院"
      width="400px"
      align-center
    >
      <span>确定删除该学院？</span>
      <template #footer>
        <span class="dialogFooter">
          <el-button type="primary" size="large" @click="handleCollegeDelete">确定</el-button>
          <el-button size="large" @click="deleteCollegeDialogVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      class="insertDialog"
      title="添加专业"
      width="400px"
      align-center
      v-model="insertProfessionDialogVisible"
      @opened="handleDialogOpened"
    >
      <el-form
        :model="insertForm"
        :rules="rules"
        label-width="80"
        status-icon
        hide-required-asterisk
      >
        <el-form-item class="item" label="学院">
          <el-autocomplete
            v-model="insertProfessionForm.college_hash_id"
            :fetch-suggestions="SearchCollege"
            value-key="hash_id"
          >
            <template #default="{ item }">
              <div>{{ item.hash_id }}</div>
              <span>{{ item.college_name }}</span>
            </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item class="item" label="专业名">
          <el-input v-model.trim="insertProfessionForm.profession_name" />
        </el-form-item>
        <el-form-item class="item" label="专业信息">
          <el-input v-model.trim="insertProfessionForm.profession_info.Info" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleProfessionInsert">提交</el-button>
          <el-button @click="insertProfessionDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      class="deleteDialog"
      v-model="deleteProfessionDialogVisible"
      title="删除专业"
      width="400px"
      align-center
    >
      <span>确定删除该专业？</span>
      <template #footer>
        <span class="dialogFooter">
          <el-button type="primary" size="large" @click="handleProfessionDelete">确定</el-button>
          <el-button size="large" @click="deleteProfessionDialogVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      class="insertDialog"
      title="添加班级"
      width="400px"
      align-center
      v-model="insertClassDialogVisible"
      @opened="handleDialogOpened"
    >
      <el-form
        :model="insertClassForm"
        :rules="rules"
        label-width="80"
        status-icon
        hide-required-asterisk
      >
        <el-form-item class="item" label="专业">
          <el-autocomplete
            v-model="insertClassForm.profession_hash_id"
            :fetch-suggestions="SearchProfession"
            value-key="hash_id"
          >
            <template #default="{ item }">
              <div>{{ item.hash_id }}</div>
              <span>{{ item.profession_name }}</span>
            </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item class="item" label="班级名">
          <el-input v-model.trim="insertClassForm.class_name" />
        </el-form-item>
        <el-form-item class="item" label="班级id">
          <el-input-number v-model="insertClassForm.class_id" controls-position="right" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleClassInsert">提交</el-button>
          <el-button @click="insertClassDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      class="deleteDialog"
      v-model="deleteClassDialogVisible"
      title="删除班级"
      width="400px"
      align-center
    >
      <span>确定删除该班级？</span>
      <template #footer>
        <span class="dialogFooter">
          <el-button type="primary" size="large" @click="handleClassDelete">确定</el-button>
          <el-button size="large" @click="deleteClassDialogVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      class="insertDialog"
      title="筛选"
      width="400px"
      align-center
      v-model="filterDialogVisible"
    >
      <el-form
        :model="filterForm"
        :rules="rules"
        label-width="80"
        status-icon
        hide-required-asterisk
      >
        <el-form-item class="item" label="专业">
          <el-autocomplete
            v-model="filterForm.profession_hash_id"
            :fetch-suggestions="SearchProfession"
            value-key="hash_id"
          >
            <template #default="{ item }">
              <div>{{ item.hash_id }}</div>
              <span>{{ item.profession_name }}</span>
            </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item class="item" label="班级">
          <el-autocomplete
            v-model="filterForm.class_hash_id"
            :fetch-suggestions="SearchClass"
            value-key="class_hash_id"
          >
            <template #default="{ item }">
              <div>{{ item.class_hash_id }}</div>
              <span>{{ item.class_name }}</span>
            </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item class="item" :label="TAG.role">
          <el-select v-model="filterForm.role_type">
            <el-option label="学院管理员" :value="'CollegeAdmin'" />
            <el-option label="老师" :value="'Teacher'" />
            <el-option label="学生" :value="'Student'" />
            <el-option label="企业人员" :value="'firm'" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleFilter">提交</el-button>
          <el-button @click="filterDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      class="insertDialog"
      title="重置密码"
      width="400px"
      align-center
      v-model="resetDialogVisible"
    >
      <el-form
        :model="filterForm"
        :rules="rules"
        label-width="80"
        status-icon
        hide-required-asterisk
        @submit.prevent
      >
        <el-form-item class="item" :label="TAG.password">
          <el-input v-model.trim="resetPassword" show-password />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleConfirmReset">提交</el-button>
          <el-button @click="resetDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
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

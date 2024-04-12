<script setup lang="ts">
const TAG = {
  TITLE: '用户',
  p1: '用户名',
  p2: '姓名',
  p3: '专业名称',
  p4: '班级名称',
  p5: '角色'
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
const getData = async () => {
  const {
    data: { data: res }
  } = await req
    .post(``, {
      page: currentPage.value,
      size: pageSize.value
    })
    .then()
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
  await req.post(``, insertForm.value)
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
  await req.delete(``, {
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
  } = await req.post(``).then()
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
</script>

<template>
  <div class="block">
    <el-table class="table" table-layout="auto" border :data="data" v-loading="loading">
      <el-table-column prop="p1" :label="TAG.p1" @click="handleCheck"> </el-table-column>
      <el-table-column prop="p2" :label="TAG.p2"> </el-table-column>
      <el-table-column prop="p3" :label="TAG.p3"> </el-table-column>
      <el-table-column prop="p4" :label="TAG.p4"> </el-table-column>
      <el-table-column prop="p5" :label="TAG.p5"> </el-table-column>
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
          <el-button type="primary" size="default" @click="insertDialogVisible = true"
            >新增</el-button
          >
          <!--            </el-col>-->
          <!--          </el-row>-->
        </template>
        <template #default="scope">
          <el-button type="primary" size="default" @click="handleUpdate(scope.row)">编辑</el-button>
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
        <el-form-item class="item" :label="TAG.p1" prop="p1">
          <el-input v-model.trim="insertForm.p1" />
        </el-form-item>
        <el-form-item class="item" :label="TAG.p2" prop="p2">
          <el-input v-model.trim="insertForm.p2" />
        </el-form-item>
        <el-form-item class="item" :label="TAG.p3" prop="p3">
          <el-input v-model.trim="insertForm.p3" />
        </el-form-item>
        <el-form-item class="item" :label="TAG.p4" prop="p4">
          <el-input v-model.trim="insertForm.p4" />
        </el-form-item>
        <el-form-item class="item" :label="TAG.p5" prop="p5">
          <el-input v-model.trim="insertForm.p5" />
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
        <el-form-item class="item" :label="TAG.p1" prop="p1">
          <el-input v-model.trim="insertForm.p1" />
        </el-form-item>
        <el-form-item class="item" :label="TAG.p2" prop="p2">
          <el-input v-model.trim="insertForm.p2" />
        </el-form-item>
        <el-form-item class="item" :label="TAG.p3" prop="p3">
          <el-input v-model.trim="insertForm.p3" />
        </el-form-item>
        <el-form-item class="item" :label="TAG.p4" prop="p4">
          <el-input v-model.trim="insertForm.p4" />
        </el-form-item>
        <el-form-item class="item" :label="TAG.p5" prop="p5">
          <el-input v-model.trim="insertForm.p5" />
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
      <el-descriptions-item :label="TAG.p1">
        {{ CheckForm.p1 }}
      </el-descriptions-item>
      <el-descriptions-item :label="TAG.p2">
        {{ CheckForm.p2 }}
      </el-descriptions-item>
      <el-descriptions-item :label="TAG.p3">
        {{ CheckForm.p3 }}
      </el-descriptions-item>
      <el-descriptions-item :label="TAG.p4">
        {{ CheckForm.p4 }}
      </el-descriptions-item>
      <el-descriptions-item :label="TAG.p5">
        {{ CheckForm.p5 }}
      </el-descriptions-item>
    </el-descriptions>
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

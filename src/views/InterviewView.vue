<script setup lang="ts">
const TAG = {
  TITLE: '面试',
  ttile: '标题',
  interviewee: '被面试人',
  interviewee_uid: '被面试人id',
  creator: '创建人',
  creator_uid: '创建人id'
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
const title = ref()
const interviewee_uid = ref()
const creator_uid = ref()
const getData = async () => {
  const {
    data: { data: res }
  } = await req
    .post(`/api/v1/interview/list`, {
      page: currentPage.value,
      size: pageSize.value,
      title: title.value,
      interviewee_id: interviewee_uid.value,
      creator_uid: creator_uid.value
    })
    .then()
  data.value = res.data
  total.value = res.total
}
onMounted(async () => {
  await getData()
  loading.value = false
})

const insertDialogVisible = ref(false)
const insertForm = ref({})
const handleConfirmInsert = async () => {
  await req.post(`/api/v1/interview`, insertForm.value)
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
  await req.put(`/api/v1/interview/change`, updateForm.value)
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
  await req.delete(`/api/v1/interview`, {
    data: {
      id: deleteId.value
    }
  })
  await getData()
  deleteDialogVisible.value = false
}
const dialogVisibleCheck = ref(false)
const CheckForm = ref({
  info: {}
})
const handleCheck = async (id) => {
  const {
    data: { data: res }
  } = await req.post(`/api/v1/interview/${id}/detail`).then()
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
      <el-table-column prop="ttile" :label="TAG.ttile" @click="handleCheck"> </el-table-column>
      <el-table-column prop="interviewee" :label="TAG.interviewee"> </el-table-column>
      <el-table-column prop="interviewee_uid" :label="TAG.interviewee_uid"> </el-table-column>
      <el-table-column prop="creator" :label="TAG.creator"> </el-table-column>
      <el-table-column prop="creator_uid" :label="TAG.creator_uid"> </el-table-column>
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
        <el-form-item class="item" :label="TAG.ttile" prop="ttile">
          <el-input v-model.trim="insertForm.title" />
        </el-form-item>
        <el-form-item class="item" label="内容" prop="interviewee">
          <el-input v-model.trim="insertForm.content" />
        </el-form-item>
        <el-form-item class="item" :label="TAG.interviewee_uid" prop="interviewee_uid">
          <el-input v-model.trim="insertForm.interviewee_uid" />
        </el-form-item>
        <el-form-item class="item" label="日期" prop="creator">
          <el-input v-model.trim="insertForm.date" />
        </el-form-item>
        <el-form-item class="item" label="职位" prop="creator">
          <el-input v-model.trim="insertForm.position" />
        </el-form-item>
        <el-form-item class="item" label="地点" prop="creator_uid">
          <el-input v-model.trim="insertForm.location" />
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
        <el-form-item class="item" label="状态" prop="ttile">
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
    <el-descriptions title="面试" :column="3" size="" border>
      <template #title>
        <div class="checkDescriptionsTitle">面试</div>
      </template>
      <el-descriptions-item :label="TAG.ttile">
        {{ CheckForm.title }}
      </el-descriptions-item>
      <el-descriptions-item :label="TAG.interviewee">
        {{ CheckForm.interviewee }}
      </el-descriptions-item>
      <el-descriptions-item label="联系信息">
        {{ CheckForm.info.contact_info }}
      </el-descriptions-item>
      <el-descriptions-item label="内容">
        {{ CheckForm.info.content }}
      </el-descriptions-item>
      <el-descriptions-item label="创建者">
        {{ CheckForm.info.creator }}
      </el-descriptions-item>
      <el-descriptions-item label="日期">
        {{ CheckForm.info.date }}
      </el-descriptions-item>
      <el-descriptions-item label="地点">
        {{ CheckForm.info.location }}
      </el-descriptions-item>
      <el-descriptions-item label="职位">
        {{ CheckForm.info.position }}
      </el-descriptions-item>
      <el-descriptions-item label="状态">
        {{ CheckForm.status }}
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

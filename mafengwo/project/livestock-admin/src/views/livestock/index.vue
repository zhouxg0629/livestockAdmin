<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-col :span="2" class="el-col-label"><span class="el-col-label-span">编号</span></el-col>
        <el-col :span="4">
          <el-input v-model="listQuery.id" placeholder="编号" class="filter-item" @keyup.enter.native="handleFilter" />
        </el-col>
        <el-col :span="2" class="el-col-label"><span class="el-col-label-span">牲畜品种</span></el-col>
        <el-col :span="4">
          <el-select v-model="listQuery.livestockBreed" placeholder="牲畜品种" clearable class="filter-item" @change="handleFilter">
            <el-option v-for="item in this.livestockBreedList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-col>
        <el-col :span="2" class="el-col-label"><span class="el-col-label-span">性别</span></el-col>
        <el-col :span="4">
          <el-select v-model="listQuery.gender" placeholder="性别" clearable class="filter-item" @change="handleFilter">
            <el-option v-for="item in this.genderList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-col>
        <el-col :span="2" class="el-col-label"><span class="el-col-label-span">是否孕育</span></el-col>
        <el-col :span="4">
          <el-select v-model="listQuery.isPregnancy" placeholder="是否孕育" clearable class="filter-item" @change="handleFilter">
            <el-option v-for="item in this.pregnancyList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2" class="el-col-label"><span class="el-col-label-span">是否育苗</span></el-col>
        <el-col :span="4">
          <el-select v-model="listQuery.isVaccine" placeholder="是否育苗" clearable class="filter-item" @change="handleFilter">
            <el-option v-for="item in this.vaccineList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-col>
        <el-col :span="2" class="el-col-label"><span class="el-col-label-span">入库地点</span></el-col>
        <el-col :span="4">
          <el-select v-model="listQuery.inStockPlaceId" placeholder="入库地点" class="filter-item" @change="handleFilter">
            <el-option v-for="item in this.inStockPlaceList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-col>
        <el-col :span="2" class="el-col-label"><span class="el-col-label-span">入库日期</span></el-col>
        <el-col :span="10">
          <div class="block filter-item">
            <el-date-picker
              v-model="value2"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2" class="el-col-label"><span class="el-col-label-span">检查日期</span></el-col>
        <el-col :span="10">
          <div class="block filter-item">
            <el-date-picker
              v-model="value2"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="2" class="el-col-label"><span class="el-col-label-span">接种日期</span></el-col>
        <el-col :span="10">
          <div class="block">
            <el-date-picker
              v-model="value2"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2" class="el-col-label"><span class="el-col-label-span">出库日期</span></el-col>
        <el-col :span="10">
          <div class="block">
            <el-date-picker
              v-model="value2"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="2" class="el-col-label"><span class="el-col-label-span">采购地点</span></el-col>
        <el-col :span="4">
          <el-select v-model="listQuery.buyPlaceId" placeholder="入库地点" class="filter-item" @change="handleFilter">
            <el-option v-for="item in this.buyPlaceList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-col>
      </el-row>

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
      <!--<el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        Add
      </el-button>-->
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        Export
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="编号" prop="id" align="center" width="60">
        <template slot-scope="{row}">
          <span>{{ row.livestockBasic.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="品种" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.livestockBasic.breedName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片" min-width="100px" align="center">
        <template slot-scope="{row}">
         <!-- <img :src="row.livestockBasic.imageUrl" width="98%" height="50%" class="pan-img">-->
          <div class="demo-image__preview">
            <el-image style="width: 100px; height: 100px" :src="row.livestockBasic.imageUrl" :preview-src-list="[row.livestockBasic.imageUrl]">
            </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="110px" align="center">
        <template slot-scope="{row}">
          <span v-if="row.livestockBasic.gender" >公牛</span>
          <span v-else>母牛</span>
        </template>
      </el-table-column>
      <el-table-column label="入库体重（KG）" width="130px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.livestockInStock.inStockWeight }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否孕育" align="center" width="80">
        <template slot-scope="{row}">
          <span v-if="row.livestockBasic.isPregnancy" >是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column label="入库地点" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.livestockInStock.inStockPlaceName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="入库日期" width="140px">
        <template slot-scope="{row}">
          <span>{{ row.livestockInStock.inStockTime | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="入库金额" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.livestockInStock.inStockAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="入库单价" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.livestockInStock.inStockPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="管理工人" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.livestockInStock.employeeName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="采购人" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <span>{{ row.livestockInStock.buyerName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="来源地" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <span>{{ row.livestockInStock.buyPlaceName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出卖方" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <span>{{ row.livestockInStock.sellerName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出卖方电话" class-name="status-col" width="120">
        <template slot-scope="{row}">
          <span>{{ row.livestockInStock.sellerPhone}}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否接种" align="center" width="80">
        <template slot-scope="{row}">
          <span v-if="row.livestockBasic.isVaccine" >是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column label="入库前接种日期" width="140px">
        <template slot-scope="{row}">
          <span v-if="row.livestockBasic.vaccineTime" >{{ row.livestockBasic.vaccineTime | parseTime('{y}-{m}-{d}') }}</span>
          <span v-else></span>
        </template>
      </el-table-column>
      <el-table-column label="入库前补充信息" width="200">
        <template slot-scope="{row}">
          <span>{{ row.livestockInStock.remark}}</span>
        </template>
      </el-table-column>
      <el-table-column label="出库日期" width="140px">
        <template slot-scope="{row}">
          <span>{{ row.livestockOutStock.outStockTime | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出库体重（KG）" width="130px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.livestockOutStock.outStockWeight }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出库金额" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.livestockOutStock.outStockAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出库单价" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.livestockOutStock.outStockPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出库流向" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.livestockOutStock.sellPlaceName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="经办人" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.livestockOutStock.sellerName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="购买方" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <span>{{ row.livestockOutStock.buyerName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="购买方电话" class-name="status-col" width="120">
        <template slot-scope="{row}">
          <span>{{ row.livestockOutStock.buyerPhone}}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNumber" :limit.sync="listQuery.pageSize" @pagination="getList" />
  </div>
</template>

<script>
import { getListByCode } from '@/api/sysConfig'
import { getListByPage } from '@/api/livestock'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    parseTime(time, format) {
      return parseTime(time, format)
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        pageNumber: 1,
        pageSize: 20,
        id: undefined,
        gender: undefined,
        isPregnancy: undefined,
        isVaccine: undefined,
        inStockPlaceId: undefined,
        inStockStartTime: undefined,
        inStockEndTime: undefined,
        buyPlaceId: undefined,
        checkStartTime: undefined,
        checkEndTime: undefined,
        vaccineStartTime: undefined,
        vaccineEndTimeL: undefined,
        outStockStartTime: undefined,
        outStockEndTime: undefined,
        livestockBreed: undefined
      },
      showReviewer: false,
      livestockBreedList: [],
      genderList: [{ id: 0, name: '母牛' }, { id: 1, name: '公牛' }],
      pregnancyList: [{ id: 0, name: '否' }, { id: 1, name: '是' }],
      vaccineList: [{ id: 0, name: '否' }, { id: 1, name: '是' }],
      inStockPlaceList: [],
      buyPlaceList: [],
      downloadLoading: false,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      value1: '',
      value2: ''
    }
  },
  created() {
    this.getList()
    this.getLivestockBreedListList()
    this.getInStockPlaceList()
    this.getBuyPlaceList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getListByPage(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.totalCount

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    getLivestockBreedListList() {
      getListByCode('livestockBreed').then(response => {
        this.livestockBreedList = response.data
      })
    },
    getInStockPlaceList() {
      getListByCode('inStockPlace').then(response => {
        this.inStockPlaceList = response.data
      })
    },
    getBuyPlaceList() {
      getListByCode('buyPlace').then(response => {
        this.buyPlaceList = response.data
      })
    },
    handleFilter() {
      this.listQuery.pageNumber = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['buyTime', 'title', 'type', 'importance', 'status']
        const filterVal = ['buyTime', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'buyTime') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

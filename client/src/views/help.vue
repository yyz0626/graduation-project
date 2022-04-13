<template>
  <div class="container">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="问题反馈" name="help">
        <p class="help-title">请在下方描述您遇到的问题:</p>
        <el-input
          type="textarea"
          placeholder="请输入..."
          v-model="help_detail"
          :autosize="{ minRows: 10 }"
          maxlength="500"
          show-word-limit
        >
        </el-input>
        <div class="help-submit">
          <el-button
            type="primary"
            round
            :disabled="!help_detail.length"
            @click="help"
            >提 交</el-button
          >
        </div>
      </el-tab-pane>

      <el-tab-pane label="历史记录" name="history">
        <el-table :data="help_info_list" border style="width: 100%">
          <el-table-column type="index" width="50" align="center" />
          <el-table-column
            prop="help_detail"
            label="反馈内容"
            align="center"
            width="130"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="create_time"
            label="反馈时间"
            width="140"
            align="center"
          >
            <template slot-scope="scope">
              {{ $moment(scope.create_time).format("lll") }}
            </template>
          </el-table-column>
          <el-table-column
            prop="d_content"
            label="处理结果"
            width="100"
            align="center"
          >
            <template slot-scope="scope">
              {{ helpResults(scope.row) }}
            </template>
          </el-table-column>
          <el-table-column prop="d_content" label="详情信息" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.status == 1">
                <p>
                  处理时间：{{ $moment(scope.row.update_time).format("lll") }}
                </p>
                <p>
                  处理人：{{ scope.row.help_fk_adminName }}({{
                    scope.row.help_fk_adminTel
                  }})
                </p>
                <p>备注：{{ scope.row.remarks }}</p>
              </div>
              <div v-else>-</div>
            </template>
          </el-table-column>
          <!-- <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                @click="edit(scope.row)"
                type="text"
                :disabled="scope.row.status == 0"
                >查看备注</el-button
              >
            </template>
          </el-table-column> -->
        </el-table>
        <!-- <pre>{{ help_info_list }}</pre> -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "help",
      help_detail: "",
      help_info_list: [],
    };
  },
  created() {
    this.getAllHelpInfos();
  },
  computed: {
    token() {
      return localStorage.getItem("token") || "";
    },
    userInfo() {
      return JSON.parse(localStorage.getItem("userInfo")) || "";
    },
  },
  methods: {
    // 问题反馈
    help() {
      let params = {
        help_detail: this.help_detail,
        help_fk_uId: this.userInfo.u_id,
        help_fk_uName: this.userInfo.u_name,
      };
      this.$http
        .post("/dynamic/help", params)
        .then((res) => {
          if (res && res.status == 200) {
            this.$message({
              message: "您的反馈已提交，请耐心等待哦~",
              type: "success",
            });
            setTimeout(() => {
              this.$router.go(0);
            }, 1000);
          }
        })
        .catch((e) => {
          this.$message({
            message: e,
            type: "warning",
          });
        });
    },

    // 查询问题反馈历史记录
    getAllHelpInfos() {
      let params = {
        help_fk_uId: this.userInfo.u_id,
      };
      this.$http
        .post("/dynamic/getAllHelpInfos", params)
        .then((res) => {
          if (res && res.status == 200) {
            this.help_info_list = res.data.help_info_list;
            //   setTimeout(() => {
            //     this.$router.go(0);
            //   }, 1000);
          }
        })
        .catch((e) => {
          this.$message({
            message: e,
            type: "warning",
          });
        });
    },

    // 处理结果
    helpResults(row) {
      console.log(row);
      if (row.status == 1) {
        // name;
        return "已处理";
      } else {
        return "暂未处理";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 830px;
  margin: 0 auto;
  padding-top: 30px;
  a {
    text-decoration: none;
  }
}
.help-title {
  margin-bottom: 10px;
  color: #67696b;
}
.help-submit {
  margin-top: 20px;
  text-align: center;
}
</style>

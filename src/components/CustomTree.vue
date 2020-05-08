<template>
  <div class="custom-tree-container">
    <div class="left">
      <h1>选择</h1>
      <el-tree
        ref="treeForm"
        :data="data"
        check-strictly
        :render-content="renderContent"
        node-key="id"
      />
    </div>

    <div class="right">
      <h1>已选</h1>
      <div v-for="(item, key) in dataChecked" :key="key" class="group">
        <span class="btn__cancel">
          <i
            class="el-icon-circle-close"
            @click="item.isPersonnel?removePersonnel(item) :removeDepartment(item)"
          ></i>
        </span>
        <div class="label__level--1">{{item.label}}:</div>
        <div class="label__level--2">{{item.children[0].label}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { generateTreeDataByNode } from "@/utils/CustomTree.js";
let seedId = 1;
export default {
  data() {
    const data = [
      {
        id: seedId++,
        label: "hebeiribao",
        children: [
          {
            id: seedId++,
            label: "quxinggongsi",
            children: [
              {
                id: seedId++,
                label: "admin0"
              },

              {
                id: seedId++,
                label: "admin1"
              },
              {
                id: seedId++,
                label: "lingdao"
              },
              {
                id: seedId++,
                label: "lingdao1"
              },
              {
                id: seedId++,
                label: "服务端",
                children: [
                  {
                    id: seedId++,
                    label: "王小儿"
                  },
                  {
                    id: seedId++,
                    label: "刘八一"
                  }
                ]
              }
            ]
          },
          {
            id: seedId++,
            label: "前端",
            children: [
              {
                id: seedId++,
                label: "王二小"
              },
              {
                id: seedId++,
                label: "李三七"
              }
            ]
          }
        ]
      }
    ];
    return {
      data: JSON.parse(JSON.stringify(data)),
      checkedDepartment: false,
      personnelId: -1,
      dataChecked: []
    };
  },

  methods: {
    removeDepartment(item) {
      this.checkedDepartment = false;
      this.removeCheckedItem(item);
    },
    removePersonnel(item) {
      this.personnelId = -1;
      this.removeCheckedItem(item);
    },
    removeCheckedItem(item) {
      this.dataChecked = this.dataChecked.filter(it => it !== item);
    },
    radioClicked(data) {
      if (data.children) return;
      this.personnelId = data.id;
      let n = this.$refs.treeForm.getNode(data);
      this.dataChecked = [
        ...this.dataChecked.filter(item => !item.isPersonnel),
        generateTreeDataByNode(n, true)
      ];
    },
    appendDepartment(data) {
      if (data.children) {
        if (!this.checkedDepartment) {
          let n = this.$refs.treeForm.getNode(data);
          this.dataChecked.push(generateTreeDataByNode(n));
          this.checkedDepartment = true;
        }
      }
    },
    renderContent(h, { node, data, store }) {
      return (
        <span
          class={
            data.children
              ? [this.$style["custom-tree-node"], this.$style["department"]]
              : [this.$style["custom-tree-node"]]
          }
        >
          {!data.children ? (
            <el-radio
              label={node.id}
              v-model={this.personnelId}
              on-change={() => {
                this.radioClicked(data);
              }}
            >
              <span>{node.label}</span>
            </el-radio>
          ) : (
            <span>{node.label}</span>
          )}

          <span>
            {!this.checkedDepartment && node.parent.parent && data.children && (
              <el-button
                size="mini"
                type="text"
                class={[this.$style["append__department"]]}
                on-click={event => {
                  event.stopPropagation();
                  this.appendDepartment(data);
                }}
              >
                <i class="el-icon-circle-plus"></i>
              </el-button>
            )}
          </span>
        </span>
      );
    }
  }
};
</script>
<style lang="sass">
.custom-tree-container
  .el-tree-node__expand-icon.is-leaf
    display: none
</style>
<style lang="sass" scoped>
.custom-tree-container
  display: flex
  height: 480px
  width: 640px
  .left ,.right
    width: 50%
    border: 1px solid gray
    h1
      font-size: 18px
      margin: 0
      padding: 6px
      background: #f1f6fe
  .group
    color: #606266
    font-size: 14px
    position: relative
    .label__level--1,.label__level--2
      display: flex
      align-items: center
      height: 26px
    .label__level--1
      padding-left: 6px
      padding-right: 6px
    .label__level--2
      padding-left: 24px
      padding-right: 6px
    .btn__cancel
      position: absolute
      display: flex
      align-items: center
      height: 26px
      right: 6px
      top: 0
</style>
<style module lang="sass">
.custom-tree-node
  flex: 1
  display: flex
  align-items: center
  justify-content: space-between
  font-size: 14px
  padding-right: 8px
  margin-left: 6px

.department
  margin-left: 0
  &:hover .append__department
    display: block

  .append__department
    display: none
    justify-content: space-between
    color: #b2b4b6
</style>
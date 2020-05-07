<template>
  <div class="custom-tree-container">
    <div class="block">
      <p>使用 render-content</p>
      <el-tree
        ref="treeForm"
        :data="data"
        check-strictly
        :render-content="renderContent"
        node-key="id"
        @node-click="nodeClicked"
      />
      <div @click="removeDepartment">{{departmentId}}</div>
      <div @click="removePersonnel">{{personnelId}}</div>
    </div>
  </div>
</template>
<script>
let id = 1000;

export default {
  data() {
    const data = [
      {
        id: 1,
        label: "河北日报",
        children: [
          {
            id: 2,
            label: "趣行公司",
            children: [
              {
                id: 3,
                label: "admin0"
              },
              {
                id: 4,
                label: "admin1"
              }
            ]
          },
          {
            id: 5,
            label: "前端",
            children: [
              {
                id: 6,
                label: "王二小"
              },
              {
                id: 7,
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
      departmentId: -1,
      personnelId: -1
    };
  },

  methods: {
    removeDepartment() {
      this.checkedDepartment = false;
      this.departmentId = -1;
    },
    removePersonnel() {
      this.personnelId = -1;
    },
    nodeClicked(data, checked, node) {
      if (data.children) return;
      this.personnelId = data.id;
    },
    append(data) {
      if (data.children) {
        if (!this.checkedDepartment) {
          this.checkedDepartment = true;
          this.departmentId = data.id;
        }
      }
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },

    renderContent(h, { node, data, store }) {
      return (
        <span
          class={
            data.children ? "custom-tree-node department" : "custom-tree-node"
          }
        >
          {!data.children ? (
            <el-radio label={node.id} v-model={this.personnelId}>
              <span>{node.label}</span>
            </el-radio>
          ) : (
            <span>{node.label}</span>
          )}

          <span>
            {!this.checkedDepartment && (
              <el-button
                size="mini"
                type="text"
                class="apend__department"
                on-click={event => {
                  event.stopPropagation();
                  this.append(data);
                }}
              >
                Append
              </el-button>
            )}
          </span>
        </span>
      );
    }
  }
};
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  font-size: 14px;
  padding-right: 8px;
}
.apend__department {
  display: none;
}
.custom-tree-node.department:hover .apend__department {
  display: block;
}
</style>
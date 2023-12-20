<template>
  <a-table :dataSource="leads" :columns="columns" expand-row-by-click>
    <template #expandedRowRender="{ record }">
      <div style="display: flex; gap: 1rem">
        <a-icon>
          <UserOutlined/>
        </a-icon>
        <span>{{ record.contact_name_user }}</span>
        <div style="display:flex; gap: 1rem ">
          <a :href="record.telephone">
            <a-icon>
              <PhoneOutlined/>
            </a-icon>
          </a>
          <a :href="record.mail">
            <MailOutlined/>
          </a>
        </div>
      </div>
    </template>
    <template #bodyCell="{column,record}">
      <template v-if="column.key === 'stats'">
        <span>
          <a-tag style="color: black"
                 :color="record._embedded.tags[0].color"
          >
            {{ record._embedded.tags[0].name.toUpperCase() }}
          </a-tag>
        </span>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts">
import UserOutlined from '@ant-design/icons-vue/UserOutlined';
import PhoneOutlined from '@ant-design/icons-vue/PhoneOutlined';
import MailOutlined from '@ant-design/icons-vue/MailOutlined';
import {Lead} from "@/intergaces/Lead";
import {defineComponent} from "vue"

export default defineComponent({
  props: ['leads'],
  components: {UserOutlined, PhoneOutlined, MailOutlined},
  setup() {
    return {
      columns: [
        {
          title: 'Название',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Бюджет',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: 'Статус',
          dataIndex: 'stats',
          key: 'stats',
        },
        {
          title: 'Ответственный',
          dataIndex: 'user_mame',
          key: 'user_mame',
        },
        {
          title: 'Время создания',
          dataIndex: 'created_at',
          key: 'created_at',
        },

      ],
    };
  },
})
</script>
<style scoped>
.icons-list :deep(.anticon) {
  margin-right: 6px;
  font-size: 40px;
}
</style>

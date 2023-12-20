<template>
  <a-card title="Сделки">
    <template #extra>
      <a-space direction="vertical">
        <a-input v-model:value="value" placeholder="Поиск" @change="onChange(value)">
          <template #suffix>
            <a-space>
              <SearchOutlined/>
            </a-space>
          </template>
        </a-input>
      </a-space>
    </template>
    <TableLeads v-bind:leads="leads"/>
  </a-card>
</template>


<script lang="ts">
import TableLeads from "@/components/TableLeads.vue";
import SearchOutlined from '@ant-design/icons-vue/SearchOutlined';
import axios from "axios";
import {InterfaceLead, Lead} from "@/intergaces/Lead";
import {defineComponent} from "vue";

export default defineComponent({
  components: {TableLeads, SearchOutlined},
  data() {
    return {
      leads: [] as Lead[],
      value: '',
    }
  },
  mounted() {
    this.leads = []
    axios.get('http://localhost:5000/get').then(response => {
      (response.data._embedded.leads as Array<unknown>).map(lead => new Lead(lead as InterfaceLead)).forEach(lead => {
        this.leads.push(lead)
      })
    })
  },
  methods: {
    onChange(value: string) {
      this.leads = []
      if (value.length < 3) {
        axios.get('http://localhost:5000/get').then(response => {
          this.leads = (response.data._embedded.leads as Array<unknown>).map(lead => new Lead(lead as InterfaceLead))
        })
      }
      axios.get(`http://localhost:5000/get/?value=${value}`, {}).then(response => {
        this.leads = (response.data._embedded.leads as Array<unknown>).map(lead => new Lead(lead as InterfaceLead))
      })

    }
  }
})
</script>

<style scoped>
.icons-list :deep(.anticon) {
  margin-right: 6px;
  font-size: 24px;
}
</style>

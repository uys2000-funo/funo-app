<template>
  <div style="overflow: auto; height: 100vh;">
    <h1>
      DataBase Update Results
    </h1>
    <div>
      <h2>
        Deleted Example Datas
      </h2>
      <template v-for="deletedData, key in deletedDatas" :key="key">
        <details>
          <summary>{{ deletedData[0] }} / {{ deletedData[1] }} </summary>
          <code><pre>{{ deletedData[2] }}</pre></code>
        </details>
      </template>
    </div>
    <div>
      <h2>
        Created Example Datas
      </h2>
      <template v-for="createdData, key in createdDatas" :key="key">
        <details>
          <summary>{{ createdData[0] }} / {{ createdData[1] }} </summary>
          <code><pre>{{ createdData[2] }}</pre></code>
        </details>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { EnterpriseUser, IndividualUser } from "@/types/user";
import { getDocument, DocumentSnapshot, setDocument } from '@/services/firebase/firestore';
import { FunoEvent } from '@/types/event';
export default defineComponent({
  data() {
    return {
      deletedDatas: [] as [string, string, string][],
      createdDatas: [] as [string, string, string][],
    }
  },
  methods: {
    deleteDataNotFound(collection: string, document: string) {
      this.deletedDatas.push([collection, document, "Data Not Found"])
    },
    async deleteDataFound(collection: string, document: string, firebaseDoc: DocumentSnapshot) {
      this.deletedDatas.push([collection, document, JSON.stringify(firebaseDoc.data(), null, 4)])
    },
    async deleteData(collection: string, document: string) {
      const firebaseDoc = await getDocument.pLogger(collection, document)
      if (!firebaseDoc.exists()) return this.deleteDataNotFound(collection, document)
      else return await this.deleteDataFound(collection, document, firebaseDoc)
    },
    async createData(collection: string, document: string, exampleData: object) {
      setDocument.pLogger(collection, document, exampleData).then(() => {
        this.createdDatas.push([collection, document, JSON.stringify(exampleData, null, 4)])
      })

    },
    async exampleUserDataUpdate() {
      await this.deleteData("-Users", "-uID")
      let data = new IndividualUser(true) as IndividualUser | EnterpriseUser
      this.createData("-Users", "-uID", data)

      await this.deleteData("-Users", "-euID")
      data = new EnterpriseUser(true)
      this.createData("-Users", "-euID", data)
    },
    async exampleEventDataUpdate() {
      await this.deleteData("-Events", "-oeID")
      let data = new FunoEvent(true, true)
      this.createData("-Events", "-oeID", data)

      await this.deleteData("-Events", "-eID")
      data = new FunoEvent(false, true)
      this.createData("-Events", "-eID", data)
    }
  },
  mounted() {
    this.exampleUserDataUpdate()
    this.exampleEventDataUpdate()
  }
})
</script>
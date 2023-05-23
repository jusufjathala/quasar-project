<template>
  <q-page class="q-pa-lg">
    <h5 class="q-mt-none">List of stuffs</h5>
    <q-list separator bordered>
      <q-item
        v-for="(task, index) in tasks"
        :key="task.title"
        tag="label"
        v-ripple
        @click="
          if (task.done == false) {
            //if false then clicked, then amount +1
            amountDone = amountDone + 1;
            tasksDone.push(task.title);
          } else {
            amountDone = amountDone - 1;
            const index = tasksDone.indexOf(task.title);
            tasksDone.splice(index, 1);
          }
        "
        :class="{ 'done bg-red-1': task.done }"
      >
        <q-item-section avatar>
          <q-checkbox v-model="task.done" color="orange" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ task.title }}</q-item-label>
          <q-item-label caption
            >This task description is : {{ task.description }}</q-item-label
          >
        </q-item-section>
        <q-item-section avatar>
          <q-btn
            @click.stop="deleteTask(index)"
            flat
            dense
            round
            color="primary"
            icon="delete"
          />
        </q-item-section>
      </q-item>
    </q-list>
    <div class="q-px-sm q-mt-sm">
      Your done tasks is: <strong>{{ tasksDone }}</strong>
    </div>
    <div class="q-px-sm q-mt-sm">
      Amount done is: <strong>{{ amountDone }}</strong>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomePage",
  data() {
    const amountDone = 0;
    const tasksDone = [];
    return {
      tasks: [
        {
          title: "jusufj task1",
          done: false,
          description: "wow task one",
        },
        {
          title: "jusufj task2",
          done: false,
          description: "wow task two",
        },
        {
          title: "jusufj task3",
          done: false,
          description: "wow task three",
        },
      ],
      tasksDone,
      amountDone,
    };
  },
  methods() {
    deleteTask(index){
      this.tasks.splice(index,1);
    }
    // return {};
  },
});
</script>

<style lang="scss">
.done {
  .q-item__label {
    text-decoration: line-through;
    color: #bbb;
  }
}
</style>

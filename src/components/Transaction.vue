<template>
  <md-card md-with-hover>
    <md-toolbar class="md-large">
      <div class="md-toolbar-container">
        <div class="md-title" style="flex: 1;">{{transaction.status | capitalize}}
          <div class="md-subhead">
              Transaction: {{transaction.id}}
          </div>
        </div>
        <slot name="buttons"></slot>
      </div>
      <div class="md-toolbar-container">
        <span  style="flex: 1;"></span>
        <div class="md-subheading">
          Total: &#8369;{{transaction.total}}
        </div>
        <span  style="flex: 1;"></span>
      </div>
    </md-toolbar>

    <md-card-content>

      <md-card-media-actions>
        <div class="md-subheading">
          Created: <span class="md-caption"> {{transaction.created_date | moment("from")}} </span>
        </div>
        <div class="md-subheading">
          Updated: <span class="md-caption"> {{transaction.updated_date | moment("from")}} </span>
        </div>
      </md-card-media-actions>

    </md-card-content>
  </md-card>
</template>

<script>
  export default {
    name: 'transaction',
    props: ['transaction'],
  }
</script>

<script setup lang="ts">
import { ref } from 'vue'
import ArcoTable from '@/components/ui/filter/ArcoTable.vue'
import type { TableColumn } from '@/config/page1'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, CreditCard, Receipt } from 'lucide-vue-next'

// Mock Data
const mockData = ref([
  { id: '1', invoiceId: 'INV-2024-001', date: '2024-01-15', amount: '$29.00', plan: 'Pro Plan', status: 'paid' },
  { id: '2', invoiceId: 'INV-2023-012', date: '2023-12-15', amount: '$29.00', plan: 'Pro Plan', status: 'paid' },
  { id: '3', invoiceId: 'INV-2023-011', date: '2023-11-15', amount: '$29.00', plan: 'Pro Plan', status: 'paid' },
  { id: '4', invoiceId: 'INV-2023-010', date: '2023-10-15', amount: '$29.00', plan: 'Pro Plan', status: 'paid' },
  { id: '5', invoiceId: 'INV-2023-009', date: '2023-09-15', amount: '$29.00', plan: 'Pro Plan', status: 'failed' },
])

const columns: TableColumn[] = [
  { key: 'invoiceId', label: 'Invoice ID', width: '150px' },
  { key: 'date', label: 'Date', width: '120px' },
  { key: 'plan', label: 'Plan', width: '120px' },
  { key: 'amount', label: 'Amount', width: '100px' },
  { key: 'status', label: 'Status', type: 'status-badge', width: '100px' },
  { 
    key: 'actions', 
    label: 'Actions', 
    type: 'text-button', 
    buttons: ['Download'], 
    width: '100px',
    align: 'right'
  }
]

const handleActionClick = (action: string, record: any) => {
  if (action === 'Download') {
    console.log('Downloading invoice', record.invoiceId)
    // Implement download logic here
  }
}
</script>

<template>
  <div class="p-6 space-y-6 max-w-6xl mx-auto w-full">
    
    <div class="flex flex-col space-y-2">
      <h2 class="text-3xl font-bold tracking-tight">Billing & Invoices</h2>
      <p class="text-muted-foreground">
        Manage your billing details and view your invoice history.
      </p>
    </div>

    <!-- Current Plan Card -->
    <Card>
      <CardHeader>
        <CardTitle>Current Plan</CardTitle>
        <CardDescription>You are currently on the <span class="font-medium text-foreground">Pro Plan</span>.</CardDescription>
      </CardHeader>
      <CardContent class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div class="flex items-center space-x-4 rounded-md border p-4">
            <CreditCard class="h-6 w-6 text-primary" />
            <div class="flex-1 space-y-1">
              <p class="text-sm font-medium leading-none">Payment Method</p>
              <p class="text-xs text-muted-foreground">Visa ending in 4242</p>
            </div>
            <Button variant="ghost" size="sm">Update</Button>
        </div>
        <div class="flex items-center space-x-4 rounded-md border p-4">
            <Receipt class="h-6 w-6 text-primary" />
            <div class="flex-1 space-y-1">
              <p class="text-sm font-medium leading-none">Next Invoice</p>
              <p class="text-xs text-muted-foreground">Feb 15, 2024</p>
            </div>
            <p class="font-medium">$29.00</p>
        </div>
      </CardContent>
    </Card>

    <!-- Invoices Table -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
         <h3 class="text-xl font-semibold">Invoice History</h3>
         <Button variant="outline" size="sm">
            <Download class="mr-2 h-4 w-4"/>
            Download All
         </Button>
      </div>

      <ArcoTable
        :columns="columns"
        :data="mockData"
        :show-checkbox="true"
        :show-checked-all="true"
        :stripe="true"
        :bordered="{ cell: true }"
        :scroll-x="true"
        height="400px" 
        @action-click="handleActionClick"
      />
    </div>
  </div>
</template>

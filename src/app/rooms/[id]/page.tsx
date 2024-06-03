import {Stat} from '@/app/page'
import {Badge} from '@/components/badge'
import {Button} from '@/components/button'
import {Heading, Subheading} from '@/components/heading'
import {Link} from '@/components/link'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/table'
import {getEvent, getEventOrders} from '@/data'
import {ChevronLeftIcon} from '@heroicons/react/16/solid'
import type {Metadata} from 'next'
import {notFound} from 'next/navigation'

export async function generateMetadata({params}: { params: { id: string } }): Promise<Metadata> {
  let event = await getEvent(params.id)

  return {
    title: event?.name,
  }
}

export default async function Event({params}: { params: { id: string } }) {
  let event = await getEvent(params.id)
  let orders = await getEventOrders(params.id)

  if (!event) {
    notFound()
  }

  return (
    <>
      <div className="max-lg:hidden">
        <Link href="/rooms" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500"/>
          Phòng
        </Link>
      </div>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6">
          <div className="w-32 shrink-0">
            <img className="aspect-[3/2] rounded-lg shadow" src={event.imgUrl} alt=""/>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Heading>{event.name}</Heading>
              <Badge color={event.status === 'On Sale' ? 'lime' : 'zinc'}>{event.status}</Badge>
            </div>
            <div className="mt-2 text-sm/6 text-zinc-500">
              <span aria-hidden="true">·</span> {event.location}
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <Button outline>Sửa</Button>
          <Button>Xem chi tiết</Button>
        </div>
      </div>
      <div className="mt-8 grid gap-8 sm:grid-cols-4">
        <Stat title="Tổng tiền cần thanh toán" value={event.totalRevenue} change={event.totalRevenueChange}/>
        <Stat
          title="Tiền điện"
          value={event.electricBill}
          change={event.ticketsSoldChange}
        />
        <Stat title="Tiền nước" value={event.pageViews} change={event.pageViewsChange}/>
        <Stat title="Chi phí khác" value={event.pageViews} change={event.pageViewsChange}/>
      </div>
      <Subheading className="mt-12">Lịch sử thanh toán</Subheading>
      <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Tháng</TableHeader>
            <TableHeader>Ngày thanh toán</TableHeader>
            <TableHeader>Tên người thuê</TableHeader>
            <TableHeader className="text-right">Số tiền</TableHeader>
            <TableHeader className="text-right">Trạng thái hoá đơn</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} href={order.url} title={`Order #${order.id}`}>
              <TableCell>{order.id}</TableCell>
              <TableCell className="text-zinc-500">{order.date}</TableCell>
              <TableCell>{order.customer.name}</TableCell>
              <TableCell className="text-right">US{order.amount.usd}</TableCell>
              <TableCell className="text-right">Đã thanh toán</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

import {Badge} from '@/components/badge'
import {Button} from '@/components/button'
import {Divider} from '@/components/divider'
import {Dropdown, DropdownButton, DropdownItem, DropdownMenu} from '@/components/dropdown'
import {Heading} from '@/components/heading'
import {Input, InputGroup} from '@/components/input'
import {Link} from '@/components/link'
import {Select} from '@/components/select'
import {getRooms} from '@/data'
import {EllipsisVerticalIcon, MagnifyingGlassIcon} from '@heroicons/react/16/solid'
import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Rooms',
}

export default async function Rooms() {
  let rooms = await getRooms()

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <Heading>Rooms</Heading>
          <div className="mt-4 flex max-w-xl gap-4">
            <div className="flex-1">
              <InputGroup>
                <MagnifyingGlassIcon/>
                <Input name="search" placeholder="Search events&hellip;"/>
              </InputGroup>
            </div>
            <div>
              <Select name="sort_by">
                <option value="name">Sort by name</option>
                <option value="date">Sort by date</option>
                <option value="status">Sort by status</option>
              </Select>
            </div>
          </div>
        </div>
        <Button>Create rooms</Button>
      </div>
      <ul className="mt-10">
        {rooms.map((room, index) => (
          <>
            <li key={room.id}>
              <Divider soft={index > 0}/>
              <div className="flex items-center justify-between">
                <div key={room.id} className="flex gap-6 py-6">
                  <div className="w-32 shrink-0">
                    <Link href={room.url} aria-hidden="true">
                      <img className="aspect-[3/2] rounded-lg shadow" src={room.imgUrl} alt=""/>
                    </Link>
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-base/6 font-semibold">
                      <Link href={room.url}>{room.name}</Link>
                    </div>
                    <div className="text-xs/6 text-zinc-500">
                      <span aria-hidden="true">·</span> {room.location}
                    </div>
                    <div className="text-xs/6 text-zinc-600">
                      {room.ticketsSold}/{room.ticketsAvailable} tickets sold
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className="max-sm:hidden" color={room.status === 'Còn trống' ? 'lime' : 'zinc'}>
                    {room.status}
                  </Badge>
                  <Dropdown>
                    <DropdownButton plain aria-label="More options">
                      <EllipsisVerticalIcon/>
                    </DropdownButton>
                    <DropdownMenu anchor="bottom end">
                      <DropdownItem href={room.url}>View</DropdownItem>
                      <DropdownItem>Edit</DropdownItem>
                      <DropdownItem>Delete</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            </li>
          </>
        ))}
      </ul>
    </>
  )
}

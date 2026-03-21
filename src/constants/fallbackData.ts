import type { ApiResponse } from '../types/api.types'

export const FALLBACK_DATA: ApiResponse = {
  _embedded: {
    events: [
      {
        id: 'fallback-1',
        name: 'Taylor Swift | The Eras Tour',
        type: 'Concert',
        dates: {
          start: { dateTime: '2026-04-18T19:00:00+10:00' },
          timezone: 'Australia/Sydney',
          status: { code: 'onsale' },
        },
        _embedded: {
          venues: [
            {
              id: 'venue-qbs',
              name: 'Qudos Bank Arena',
              city: { name: 'Sydney' },
              state: { name: 'New South Wales', stateCode: 'NSW' },
              address: { line1: 'Edwin Flack Avenue, Sydney Olympic Park' },
              postalCode: '2127',
            },
          ],
        },
        info: 'The global phenomenon continues with Taylor Swift bringing her record-breaking Eras Tour to Sydney. Experience hits spanning her entire career in a spectacular stadium production.',
      },
      {
        id: 'fallback-2',
        name: 'AFL Grand Final',
        type: 'Sports',
        dates: {
          start: { dateTime: '2026-09-26T14:30:00+10:00' },
          timezone: 'Australia/Melbourne',
          status: { code: 'onsale' },
        },
        _embedded: {
          venues: [
            {
              id: 'venue-mcg',
              name: 'Melbourne Cricket Ground',
              city: { name: 'Melbourne' },
              state: { name: 'Victoria', stateCode: 'VIC' },
              address: { line1: 'Brunton Avenue, Richmond' },
              postalCode: '3002',
            },
          ],
        },
        info: 'The biggest day on the Australian sporting calendar. Two teams battle it out for the ultimate prize in front of 100,000 fans at the iconic MCG.',
      },
      {
        id: 'fallback-3',
        name: 'Hamilton',
        type: 'Theatre',
        dates: {
          start: { dateTime: '2026-04-15T19:30:00+10:00' },
          timezone: 'Australia/Melbourne',
          status: { code: 'onsale' },
        },
        _embedded: {
          venues: [
            {
              id: 'venue-pts',
              name: 'Princess Theatre',
              city: { name: 'Melbourne' },
              state: { name: 'Victoria', stateCode: 'VIC' },
              address: { line1: '163 Spring Street' },
              postalCode: '3000',
            },
          ],
        },
        info: "Lin-Manuel Miranda's groundbreaking musical tells the story of American founding father Alexander Hamilton through hip-hop, R&B, and Broadway show tunes.",
      },
      {
        id: 'fallback-4',
        name: 'Hannah Gadsby: Body of Work',
        type: 'Comedy',
        dates: {
          start: { dateTime: '2026-04-22T20:00:00+10:00' },
          timezone: 'Australia/Sydney',
          status: { code: 'onsale' },
        },
        _embedded: {
          venues: [
            {
              id: 'venue-soh',
              name: 'Sydney Opera House',
              city: { name: 'Sydney' },
              state: { name: 'New South Wales', stateCode: 'NSW' },
              address: { line1: 'Bennelong Point' },
              postalCode: '2000',
            },
          ],
        },
        info: 'The Emmy-nominated comedian returns to the Sydney Opera House with a brand new show exploring art, identity, and the absurdity of modern life.',
      },
      {
        id: 'fallback-5',
        name: 'Splendour in the Grass 2026',
        type: 'Festival',
        dates: {
          start: { dateTime: '2026-07-24T12:00:00+10:00' },
          timezone: 'Australia/Brisbane',
          status: { code: 'onsale' },
        },
        _embedded: {
          venues: [
            {
              id: 'venue-bec',
              name: 'Brisbane Entertainment Centre',
              city: { name: 'Brisbane' },
              state: { name: 'Queensland', stateCode: 'QLD' },
              address: { line1: 'Melton Road, Boondall' },
              postalCode: '4034',
            },
          ],
        },
        info: "Australia's premier music festival returns with an incredible three-day lineup featuring over 50 local and international artists across multiple stages.",
      },
      {
        id: 'fallback-6',
        name: 'Coldplay | Music of the Spheres',
        type: 'Concert',
        dates: {
          start: { dateTime: '2026-05-03T18:00:00+10:00' },
          timezone: 'Australia/Melbourne',
          status: { code: 'onsale' },
        },
        _embedded: {
          venues: [
            {
              id: 'venue-rla',
              name: 'Rod Laver Arena',
              city: { name: 'Melbourne' },
              state: { name: 'Victoria', stateCode: 'VIC' },
              address: { line1: 'Olympic Boulevard' },
              postalCode: '3001',
            },
          ],
        },
        info: 'Coldplay brings their spectacular Music of the Spheres world tour to Melbourne with stunning visuals, LED wristbands, and an unforgettable concert experience.',
      },
      {
        id: 'fallback-7',
        name: 'Van Gogh Alive',
        type: 'Exhibition',
        dates: {
          start: { dateTime: '2026-04-05T10:00:00+10:00' },
          timezone: 'Australia/Melbourne',
          status: { code: 'onsale' },
        },
        _embedded: {
          venues: [
            {
              id: 'venue-mnp',
              name: 'Melbourne & Olympic Parks',
              city: { name: 'Melbourne' },
              state: { name: 'Victoria', stateCode: 'VIC' },
              address: { line1: 'Olympic Boulevard' },
              postalCode: '3001',
            },
          ],
        },
        info: 'Step inside the world of Vincent van Gogh in this multi-sensory immersive experience. Over 3,000 images projected across walls, floors, and ceilings.',
      },
      {
        id: 'fallback-8',
        name: 'Australia vs India — 1st Test',
        type: 'Sports',
        dates: {
          start: { dateTime: '2026-04-10T10:30:00+10:00' },
          timezone: 'Australia/Brisbane',
          status: { code: 'onsale' },
        },
        _embedded: {
          venues: [
            {
              id: 'venue-gab',
              name: 'The Gabba',
              city: { name: 'Brisbane' },
              state: { name: 'Queensland', stateCode: 'QLD' },
              address: { line1: 'Vulture Street, Woolloongabba' },
              postalCode: '4102',
            },
          ],
        },
        info: 'The Border-Gavaskar Trophy series kicks off at the Gabba as Australia takes on India in a highly anticipated Test match. Five days of world-class cricket.',
      },
    ],
  },
}

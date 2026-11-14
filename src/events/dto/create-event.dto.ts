import {
  IsString,
  IsNotEmpty,
  IsIn,
  IsBoolean,
  IsDateString,
} from 'class-validator';

import { EVENT_CATEGORIES } from '../event.types.js';
import type { EventCategory } from '../event.types.js';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  location!: string;

  @IsDateString()
  eventDate!: string;

  @IsIn(EVENT_CATEGORIES)
  category!: EventCategory;

  @IsBoolean()
  isPublished!: boolean;
}
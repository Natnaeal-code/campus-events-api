
import {
  IsIn,
  IsOptional,
  IsString,
  IsBoolean,
  IsInt,
  Min,
} from 'class-validator';

import { Type, Transform } from 'class-transformer';

export class FindEventsQueryDto {
  // Filter by event category
  @IsOptional()
  @IsIn([
    'technology',
    'business',
    'academic',
    'sports',
    'social',
  ])
  category?: string;

  // Filter by event location
  @IsOptional()
  @IsString()
  location?: string;

  // Filter by publication status
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  isPublished?: boolean;

  // Choose which field to sort by
  @IsOptional()
  @IsIn(['eventDate', 'title'])
  sortBy?: 'eventDate' | 'title';

  // Choose sorting direction
  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';

  // Select the page number
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  // Number of events per page
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Long } from 'src/utils/mongoose-long';

@Schema()
export class Cat {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Long })
  age: Long;

  @Prop()
  breed: string;
}

export type CatDocument = Cat & Document;

export const CatSchema = SchemaFactory.createForClass(Cat);

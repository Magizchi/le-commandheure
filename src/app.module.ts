import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DATA_BASE_HOST,
      port: parseInt(process.env.DATA_BASE_PORT),
      username: process.env.DATA_BASE_USER,
      password: process.env.DATA_BASE_PASSWORD,
      database: process.env.DATA_BASE,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: process.env.DATA_BASE_SYNCHRONIZE === "true" ? true : false,

    }),
    ProductsModule,
    CategoriesModule,
    ShoppingCartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }

// Address Entity

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
  } from 'typeorm';
  import { User } from './User';
  
  @Entity({ name: 'addresses' })
  export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.addresses)
    user: User;
  
    @Column({ type: 'enum', enum: ['billing', 'shipping'] })
    addressType: 'billing' | 'shipping';
  
    @Column()
    country: string;
  
    @Column()
    city: string;
  
    @Column()
    state: string;
  
    @Column()
    postalCode: string;
  
    @Column()
    address: string;
  
    @Column({ nullable: true })
    phone: string;
  
    @Column({ nullable: true })
    fax: string;
  
    @Column({ nullable: true })
    aptOrSuite: string;
  
    @Column({ nullable: true })
    company: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  }
  
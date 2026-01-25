"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "./label";
import React from "react";
import { Field, FieldLabel } from "./field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./input-group";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./calendar";

export default function AddMilitary() {
  function formatDate(date: Date | undefined) {
    if (!date) {
      return "";
    }
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }
  function isValidDate(date: Date | undefined) {
    if (!date) {
      return false;
    }
    return !isNaN(date.getTime());
  }
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [value, setValue] = React.useState(formatDate(date));

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button className="rounded-full cursor-pointer">
            Adicionar militar
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar militar</DialogTitle>
            <DialogDescription>
              {" "}
              Insira aqui as informações do militar
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-row gap-24">
            <div id="col-1" className="flex flex-col gap-4">
              <Label htmlFor="grad">POSTO/GRAD</Label>
              <Input id="grad" placeholder="SO" />

              <Label htmlFor="name">NOME COMPLETO</Label>
              <Input id="name" placeholder="FULANO DE TAL" />

              <Label htmlFor="war-name">NOME DE GUERRA</Label>
              <Input id="war-name" placeholder="FULANO" />

              <Label htmlFor="section">SEÇÃO</Label>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Seção" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="com">COM</SelectItem>
                  <SelectItem value="civa">CIVA</SelectItem>
                  <SelectItem value="fis">FIS</SelectItem>
                  <SelectItem value="sar">SAR</SelectItem>
                  <SelectItem value="opg">OPG</SelectItem>
                  <SelectItem value="dt">DT</SelectItem>
                  <SelectItem value="dtcea-br">DTCEA-BE</SelectItem>
                  <SelectItem value="dtcea-bv">DTCEA-BV</SelectItem>
                  <SelectItem value="dtcea-pv">DTCEA-PV</SelectItem>
                  <SelectItem value="dtcea-gm">DTCEA-GM</SelectItem>
                </SelectContent>
              </Select>

              <Label htmlFor="qualifications">HABILITAÇÕES</Label>
              <Input id="qualifications" />

              <Label htmlFor="maintenance">MANUTENÇÃO</Label>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Seção" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">SIM</SelectItem>
                  <SelectItem value="no">NÃO</SelectItem>
                </SelectContent>
              </Select>

              <Label htmlFor="identity">IDENTIDADE</Label>
              <Input id="identity" />

              <Label htmlFor="saram">SARAM</Label>
              <Input id="saram" />

              <Label htmlFor="phone">TELEFONE</Label>
              <Input id="phone" />
            </div>

            <div id="col-2" className="flex flex-col gap-4">
              <Label htmlFor="cpf">CPF</Label>
              <Input id="cpf" />

              <Label htmlFor="email">EMAIL</Label>
              <Input id="email" />

              <Label htmlFor="graduation-date">DATA DA FORMATURA</Label>
              <Field className="mx-auto w-48">
                <InputGroup>
                  <InputGroupInput
                    id="date-required"
                    value={value}
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      setValue(e.target.value);
                      if (isValidDate(date)) {
                        setDate(date);
                        setMonth(date);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setOpen(true);
                      }
                    }}
                  />
                  <InputGroupAddon align="inline-end">
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <InputGroupButton
                          id="date-picker"
                          variant="ghost"
                          size="icon-xs"
                          aria-label="Select date"
                        >
                          <CalendarIcon />
                          <span className="sr-only">Selecione uma data</span>
                        </InputGroupButton>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                        alignOffset={-8}
                        sideOffset={10}
                      >
                        <Calendar
                          mode="single"
                          selected={date}
                          month={month}
                          onMonthChange={setMonth}
                          onSelect={(date) => {
                            setDate(date);
                            setValue(formatDate(date));
                            setOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </InputGroupAddon>
                </InputGroup>
              </Field>

              <Label htmlFor="last-promotion">ÚLTIMA PROMOÇÃO</Label>
              <Field className="mx-auto w-48">
                <InputGroup>
                  <InputGroupInput
                    id="date-required"
                    value={value}
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      setValue(e.target.value);
                      if (isValidDate(date)) {
                        setDate(date);
                        setMonth(date);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setOpen(true);
                      }
                    }}
                  />
                  <InputGroupAddon align="inline-end">
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <InputGroupButton
                          id="date-picker"
                          variant="ghost"
                          size="icon-xs"
                          aria-label="Select date"
                        >
                          <CalendarIcon />
                          <span className="sr-only">Selecione uma data</span>
                        </InputGroupButton>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                        alignOffset={-8}
                        sideOffset={10}
                      >
                        <Calendar
                          mode="single"
                          selected={date}
                          month={month}
                          onMonthChange={setMonth}
                          onSelect={(date) => {
                            setDate(date);
                            setValue(formatDate(date));
                            setOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </InputGroupAddon>
                </InputGroup>
              </Field>

              <Label htmlFor="praca-date">DATA DE PRAÇA</Label>
              <Field className="mx-auto w-48">
                <InputGroup>
                  <InputGroupInput
                    id="date-required"
                    value={value}
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      setValue(e.target.value);
                      if (isValidDate(date)) {
                        setDate(date);
                        setMonth(date);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setOpen(true);
                      }
                    }}
                  />
                  <InputGroupAddon align="inline-end">
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <InputGroupButton
                          id="date-picker"
                          variant="ghost"
                          size="icon-xs"
                          aria-label="Select date"
                        >
                          <CalendarIcon />
                          <span className="sr-only">Selecione uma data</span>
                        </InputGroupButton>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                        alignOffset={-8}
                        sideOffset={10}
                      >
                        <Calendar
                          mode="single"
                          selected={date}
                          month={month}
                          onMonthChange={setMonth}
                          onSelect={(date) => {
                            setDate(date);
                            setValue(formatDate(date));
                            setOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </InputGroupAddon>
                </InputGroup>
              </Field>

              <Label htmlFor="presentation-date">DATA DE APRESENTAÇÃO</Label>
              <Field className="mx-auto w-48">
                <InputGroup>
                  <InputGroupInput
                    id="date-required"
                    value={value}
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      setValue(e.target.value);
                      if (isValidDate(date)) {
                        setDate(date);
                        setMonth(date);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setOpen(true);
                      }
                    }}
                  />
                  <InputGroupAddon align="inline-end">
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <InputGroupButton
                          id="date-picker"
                          variant="ghost"
                          size="icon-xs"
                          aria-label="Select date"
                        >
                          <CalendarIcon />
                          <span className="sr-only">Selecione uma data</span>
                        </InputGroupButton>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                        alignOffset={-8}
                        sideOffset={10}
                      >
                        <Calendar
                          mode="single"
                          selected={date}
                          month={month}
                          onMonthChange={setMonth}
                          onSelect={(date) => {
                            setDate(date);
                            setValue(formatDate(date));
                            setOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </InputGroupAddon>
                </InputGroup>
              </Field>

              <Label htmlFor="area-time">TEMPO DE ÁREA</Label>
              <Input id="area-time" />

              <Label htmlFor="duty-time">TEMPO DE SERVIÇO</Label>
              <Input id="duty-time" />

              <Label htmlFor="situation">SITUAÇÃO</Label>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Situação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expediente">EXPEDIENTE</SelectItem>
                  <SelectItem value="escala">ESCALA</SelectItem>
                  <SelectItem value="nao-aplicavel">NÃO APLICÁVEL</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div id="col-3" className="flex flex-col gap-4">
              <Label htmlFor="operational-score-exam">
                NOTA TESTE OPERACIONAL
              </Label>
              <Input id="operational-score-exam" />

              <Label htmlFor="examiner">AVALIADOR</Label>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Seção" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">SIM</SelectItem>
                  <SelectItem value="no">NÃO</SelectItem>
                </SelectContent>
              </Select>

              <Label htmlFor="theoretical-date-exam">DATA PROVA TEÓRICA</Label>
              <Field className="mx-auto w-48">
                <InputGroup>
                  <InputGroupInput
                    id="date-required"
                    value={value}
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      setValue(e.target.value);
                      if (isValidDate(date)) {
                        setDate(date);
                        setMonth(date);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setOpen(true);
                      }
                    }}
                  />
                  <InputGroupAddon align="inline-end">
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <InputGroupButton
                          id="date-picker"
                          variant="ghost"
                          size="icon-xs"
                          aria-label="Select date"
                        >
                          <CalendarIcon />
                          <span className="sr-only">Selecione uma data</span>
                        </InputGroupButton>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                        alignOffset={-8}
                        sideOffset={10}
                      >
                        <Calendar
                          mode="single"
                          selected={date}
                          month={month}
                          onMonthChange={setMonth}
                          onSelect={(date) => {
                            setDate(date);
                            setValue(formatDate(date));
                            setOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </InputGroupAddon>
                </InputGroup>
              </Field>

              <Label htmlFor="lpna">LPNA</Label>
              <Input id="lpna" />

              <Label htmlFor="ht-validity">VALIDADE HT</Label>
              <Field className="mx-auto w-48">
                <InputGroup>
                  <InputGroupInput
                    id="date-required"
                    value={value}
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      setValue(e.target.value);
                      if (isValidDate(date)) {
                        setDate(date);
                        setMonth(date);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setOpen(true);
                      }
                    }}
                  />
                  <InputGroupAddon align="inline-end">
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <InputGroupButton
                          id="date-picker"
                          variant="ghost"
                          size="icon-xs"
                          aria-label="Select date"
                        >
                          <CalendarIcon />
                          <span className="sr-only">Selecione uma data</span>
                        </InputGroupButton>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                        alignOffset={-8}
                        sideOffset={10}
                      >
                        <Calendar
                          mode="single"
                          selected={date}
                          month={month}
                          onMonthChange={setMonth}
                          onSelect={(date) => {
                            setDate(date);
                            setValue(formatDate(date));
                            setOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </InputGroupAddon>
                </InputGroup>
              </Field>

              <Label htmlFor="inspsau-validity">VALIDADE INSPSAU</Label>
              <Field className="mx-auto w-48">
                <InputGroup>
                  <InputGroupInput
                    id="date-required"
                    value={value}
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      setValue(e.target.value);
                      if (isValidDate(date)) {
                        setDate(date);
                        setMonth(date);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setOpen(true);
                      }
                    }}
                  />
                  <InputGroupAddon align="inline-end">
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <InputGroupButton
                          id="date-picker"
                          variant="ghost"
                          size="icon-xs"
                          aria-label="Select date"
                        >
                          <CalendarIcon />
                          <span className="sr-only">Selecione uma data</span>
                        </InputGroupButton>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                        alignOffset={-8}
                        sideOffset={10}
                      >
                        <Calendar
                          mode="single"
                          selected={date}
                          month={month}
                          onMonthChange={setMonth}
                          onSelect={(date) => {
                            setDate(date);
                            setValue(formatDate(date));
                            setOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </InputGroupAddon>
                </InputGroup>
              </Field>

              <Label htmlFor="birth-date">DATA DE NASCIMENTO</Label>
              <Field className="mx-auto w-48">
                <InputGroup>
                  <InputGroupInput
                    id="date-required"
                    value={value}
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      setValue(e.target.value);
                      if (isValidDate(date)) {
                        setDate(date);
                        setMonth(date);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setOpen(true);
                      }
                    }}
                  />
                  <InputGroupAddon align="inline-end">
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <InputGroupButton
                          id="date-picker"
                          variant="ghost"
                          size="icon-xs"
                          aria-label="Select date"
                        >
                          <CalendarIcon />
                          <span className="sr-only">Selecione uma data</span>
                        </InputGroupButton>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                        alignOffset={-8}
                        sideOffset={10}
                      >
                        <Calendar
                          mode="single"
                          selected={date}
                          month={month}
                          onMonthChange={setMonth}
                          onSelect={(date) => {
                            setDate(date);
                            setValue(formatDate(date));
                            setOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            </div>
          </div>

          <div className="flex justify-end">
            <Button className="rounded-full w-32">Cadastrar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

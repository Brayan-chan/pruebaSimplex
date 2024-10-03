"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import React from 'react'

export function SimplexSolverComponent() {
  const [numVariables, setNumVariables] = useState(2)
  const [numRestrictions, setNumRestrictions] = useState(3)
  const [objective, setObjective] = useState('maximize')
  const [objectiveFunction, setObjectiveFunction] = useState<string[]>(['3', '2'])
  const [variables, setVariables] = useState<string[]>(['X1', 'X2'])
  const [restrictions, setRestrictions] = useState<string[][]>([
    ['2', '1', '100'],
    ['1', '1', '80'],
    ['1', '0', '40']
  ])
  const [results, setResults] = useState<number[][]>([])

  const generateFields = () => {
    setObjectiveFunction(Array(numVariables).fill(''))
    setVariables(Array(numVariables).fill('').map((_, i) => `X${i+1}`))
    setRestrictions(Array(numRestrictions).fill(0).map(() => Array(numVariables + 1).fill('')))
  }

  const updateRestriction = (rowIndex: number, colIndex: number, value: string) => {
    const newRestrictions = restrictions.map((row, rIndex) => 
      rIndex === rowIndex ? row.map((col, cIndex) => cIndex === colIndex ? value : col) : row
    )
    setRestrictions(newRestrictions)
  }

  const solve = () => {
    // Aquí implementarías el algoritmo Simplex
    // Por ahora, solo mostramos resultados de ejemplo
    setResults([
      [0, 0, 0, 2, 0, 21],
      [-1, 0, -1, 1, 1, 16],
      [2, 1, 1, 0, 1, 8],
      [0, 0, 0, -1, 2, 12]
    ])
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Método Simplex - Programación Lineal</h1>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <Label htmlFor="numVariables">Número de variables</Label>
          <Input
            id="numVariables"
            type="number"
            value={numVariables}
            onChange={(e) => setNumVariables(parseInt(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="numRestrictions">Número de restricciones</Label>
          <Input
            id="numRestrictions"
            type="number"
            value={numRestrictions}
            onChange={(e) => setNumRestrictions(parseInt(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="objective">Maximizar/Minimizar</Label>
          <Select value={objective} onValueChange={setObjective}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="maximize">Maximizar</SelectItem>
              <SelectItem value="minimize">Minimizar</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button onClick={generateFields} className="mb-4">Generar campos</Button>

      {objectiveFunction.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Función Objetivo</h2>
          <div className="flex items-center gap-2">
            <span>{objective === 'maximize' ? 'Max Z =' : 'Min Z ='}</span>
            {objectiveFunction.map((value, index) => (
              <div key={`obj-${index}`} className="flex items-center">
                <Input
                  className="w-20"
                  value={value}
                  onChange={(e) => {
                    const newObj = [...objectiveFunction]
                    newObj[index] = e.target.value
                    setObjectiveFunction(newObj)
                  }}
                />
                <span className="ml-1">{variables[index]}</span>
                {index < objectiveFunction.length - 1 && <span className="mx-1">+</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {variables.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Variables</h2>
          <div className="grid grid-cols-4 gap-2">
            {variables.map((value, index) => (
              <Input
                key={`var-${index}`}
                value={value}
                onChange={(e) => {
                  const newVars = [...variables]
                  newVars[index] = e.target.value
                  setVariables(newVars)
                }}
              />
            ))}
          </div>
        </div>
      )}

      {restrictions.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Restricciones</h2>
          {restrictions.map((restriction, rowIndex) => (
            <div key={`restriction-${rowIndex}`} className="flex items-center gap-2 mb-2">
              {restriction.map((value, colIndex) => (
                <React.Fragment key={`restriction-${rowIndex}-${colIndex}`}>
                  {colIndex > 0 && colIndex < restriction.length - 1 && <span>+</span>}
                  <Input
                    className="w-20"
                    value={value}
                    onChange={(e) => updateRestriction(rowIndex, colIndex, e.target.value)}
                  />
                  {colIndex < restriction.length - 1 && (
                    <span>{variables[colIndex]}</span>
                  )}
                  {colIndex === restriction.length - 2 && <span>≤</span>}
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      )}

      <Button onClick={solve} className="mb-4">Resolver</Button>

      {results.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Resultados</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>r</TableHead>
                <TableHead>x</TableHead>
                <TableHead>A1</TableHead>
                <TableHead>S1</TableHead>
                <TableHead>S2</TableHead>
                <TableHead>k</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((row, index) => (
                <TableRow key={`result-${index}`}>
                  {row.map((cell, cellIndex) => (
                    <TableCell key={`result-${index}-${cellIndex}`}>{cell}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
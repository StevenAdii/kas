import React, { useState } from "react";
import { PlusCircle, Wallet, TrendingUp, TrendingDown, Calendar, Search, DollarSign, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const PersonalFinanceTracker = () => {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    const newTransaction = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      type,
      date: new Date().toLocaleDateString(),
    };

    setTransactions([newTransaction, ...transactions]);
    setDescription("");
    setAmount("");
    setShowForm(false);
  };

  const calculateBalance = () => {
    return transactions.reduce((acc, curr) => {
      return curr.type === "income" ? acc + curr.amount : acc - curr.amount;
    }, 0);
  };

  const calculateTotal = (type) => {
    return transactions.filter((t) => t.type === type).reduce((acc, curr) => acc + curr.amount, 0);
  };

  const filteredTransactions = transactions.filter((transaction) => transaction.description.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Financial Dashboard</h1>
            <button onClick={() => setShowForm(true)} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <PlusCircle className="h-5 w-5" />
              Add Transaction
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <Wallet className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rp{calculateBalance().toLocaleString()}</div>
              <p className="text-xs text-gray-400">Updated just now</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">Rp{calculateTotal("income").toLocaleString()}</div>
              <p className="text-xs text-gray-400">100% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-400">Rp{calculateTotal("expense").toLocaleString()}</div>
              <p className="text-xs text-gray-400">+10.5% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Transaction List */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <CardTitle className="text-xl">Recent Transactions</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/4 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-gray-700 text-gray-100 pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {filteredTransactions.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-400">No transactions found</p>
                    </div>
                  ) : (
                    filteredTransactions.map((transaction) => (
                      <div key={transaction.id} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className={`p-2 rounded-full ${transaction.type === "income" ? "bg-green-400/10 text-green-400" : "bg-red-400/10 text-red-400"}`}>
                              {transaction.type === "income" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                            </div>
                            <div>
                              <p className="font-medium">{transaction.description}</p>
                              <div className="flex items-center text-xs text-gray-400 mt-1">
                                <Calendar className="h-3 w-3 mr-1" />
                                {transaction.date}
                              </div>
                            </div>
                          </div>
                          <div className={`text-lg font-bold ${transaction.type === "income" ? "text-green-400" : "text-red-400"}`}>
                            {transaction.type === "income" ? "+" : "-"}Rp
                            {transaction.amount.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Highest Expense</p>
                    <p className="text-lg font-bold text-red-400">
                      Rp
                      {Math.max(...(transactions.filter((t) => t.type === "expense").map((t) => t.amount) || [0])).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Highest Income</p>
                    <p className="text-lg font-bold text-green-400">
                      Rp
                      {Math.max(...(transactions.filter((t) => t.type === "income").map((t) => t.amount) || [0])).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Total Transactions</p>
                    <p className="text-lg font-bold">{transactions.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <Card className="bg-gray-800 border-gray-700 w-full max-w-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Add New Transaction</CardTitle>
                <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-100">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400">Description</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-gray-700 text-gray-100 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter description"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400">Amount</label>
                  <div className="relative ">
                    <DollarSign className="absolute left-2 top-1/4  text-gray-400 h-5 w-5" />
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full bg-gray-700 text-gray-100 pl-8 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter amount"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Type</label>
                  <select value={type} onChange={(e) => setType(e.target.value)} className="w-full bg-gray-700 text-gray-100 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </div>

                <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors">
                  Add Transaction
                </button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PersonalFinanceTracker;

package com.example.fintracker.service;


import com.example.fintracker.model.Transaction;
import com.example.fintracker.controller.repository.TransactionRepository;

import com.example.fintracker.observer.TransactionObservable;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TransactionService extends TransactionObservable {

    private final TransactionRepository transactionRepository;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }
    public Optional<Transaction> getTransactionById(Long id ) {
        return transactionRepository.findById(id);
    }
    public  Transaction registerTransaction(String tipo, float valor, int userId, String categoria, Date data) {
        Transaction newTransaction = new Transaction();
        newTransaction.setTipo(tipo);
        newTransaction.setValor(valor);
        newTransaction.setUser_id(userId);
        newTransaction.setCategoria(categoria);
        newTransaction.setData(data);

        notifyObservers(newTransaction);
         return transactionRepository.save(newTransaction);
    }



}
